const express = require('express');
const router = express.Router();
const { Product, Order, Orderdetail, User, Address, Notification } = require('../db.js');
const Sequelize = require('sequelize');
const mercadopago = require('mercadopago');
const {ACCESS_TOKEN} = process.env;
const axios = require('axios');

mercadopago.configure({
    access_token: ACCESS_TOKEN
});

router.post('/payment', async (req,res,next) => {
    const {body} = req;

    try {
            const items_ml = body.cart.map((product) =>({
                id: product.id,
                title: product.title,
                unit_price: product.price,
                quantity: product.quantity,
                currency_id: "ARS",
            }));
            
            // const total = body.cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

            // const quatityProducts = body.cart.reduce((acc, product) => acc + product.quantity, 0);
            //sacamos la cantidad de productos del carrito de compras

            let preference = {
                items: items_ml,
                back_urls: {
                    success: "https://e-commerce-production-9dbb.up.railway.app/payment/result",
                    failure: "https://e-commerce-production-9dbb.up.railway.app/payment/result",
                    pending: ""
                },
                payer:{
                    email: body.user.email,
                    name: body.user.email,
                },
                payment_methods: {
                //excluimos pagos por cajero automático y tickets.
                    excluded_payment_methods: [
                        {
                            id: "atm"
                        }
                    ],
                    excluded_payment_types: [
                        {
                            id: "ticket"
                        }
                    ],
                    //cantidad de cuotas para pruebas es 1.
                    installments: 3
                },
                //anula la posibilidad de pago en efectivo
                binary_mode: true,
                // notification_url: "https://e-commerce-production-9dbb.up.railway.app/notification",
                statement_descriptor: "To-Mate",
            }
            mercadopago.preferences.create(preference)
            .then((resp)=> {
                return res
                .status(200)
                .json(resp.body.init_point)
            }).catch((err)=> {
                 console.log(err)
                res.send({error: err.message})
                next(err)
            });
    } catch (error) {
        console.log(error);
        next(error);
        return res.status(500).send({message:error});
    }
});

//RUTA NOTIFICATION DONDE RECIBIMOS LA DATA DEL PAGO. 
// SI OBVIAMOS ESTA DATA, EN REALIDAD DEBERIAMOS PODER CREAR EL POST DE LA COMPRA
// SIN AFECTAR NADA EN LA BASE DE DATOS, POR QUE ES SOLO PARA DESPLEGAR REALMENTE LA APP CON DINERO REAL.

router.get("/payment/result", async (req, res) => {
    const payment_id = req.query.payment_id;
    let status = req.query.status; 

     if(status === "approved"){
         const mercadopagoreq =  await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}?access_token=${ACCESS_TOKEN}`);

        const payerTomate = mercadopagoreq.data.additional_info.payer.first_name;
        const itemsPagados =  mercadopagoreq.data.additional_info.items;
        const {operation_type, transaction_amount,order} = mercadopagoreq.data;

        let status = mercadopagoreq.data.status;
        if(status === 'approved') status = 'creada';
        if(status === 'rejected') status = 'cancelada';

        let statusDetail = mercadopagoreq.data.status_detail;
        if(statusDetail === 'accredited') statusDetail = 'completa';

        const orderCreated = await Order.create({
            status: statusDetail,
            purchaseCost: transaction_amount,
            payOrder: order.id,
            paymentMethod: operation_type,
            userEmail: payerTomate,
            email: payerTomate,
        });
        await orderCreated.addUser(payerTomate);
        // console.log(orderCreated,'orderCreated')

        itemsPagados.forEach( async(item) => {
            let idNumber = Number(item.id);
            const orderDetailCreated = await Orderdetail.create({
                purchasedamount: itemsPagados.length,
                purchaseprice: transaction_amount,
                orderId: orderCreated.id,
                productId:idNumber,
            });
            // console.log(orderDetailCreated,'orderDetailCreated');
        });
        await itemsPagados.forEach(async (item) => {
            let updateProductStock = await Product.update(
                {
                    stock: Sequelize.literal(`stock - ${item.quantity}`),
                },
                {where: {
                    id: item.id
                }
            });
        });
        return res.redirect("https://testpf.vercel.app/checkout-success");
    }
    return res.redirect("https://testpf.vercel.app/checkout-failure");
});

  
  router.get("/payment/:id", (req, res) => {
    const mp = new mercadopago(ACCESS_TOKEN);
    const id = req.params.id;

    // console.info("Buscando el id", id);
    mp.get(`/v1/payments/search`, { id: id })
      .then((result) => {
        res.status(200).send({ result: result });
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  });

router.post('/notification', async (req,res,next) => {
    const query = req.query;

    if(query.id && query.topic == 'merchant_order'){
        const [noti, create] = await Notification.findOrCreate({
            where: {norder: query.id}
        })
    }
    res.send('ok').status(200);
});

// mercadopago.merchant_orders.findById()

module.exports = router;