const express = require('express');
const router = express.Router();
const { Product, Order, Orderdetail, User, Address } = require('../db.js');
const mercadopago = require('mercadopago');
const {ACCESS_TOKEN} = process.env;


mercadopago.configure({
    access_token: ACCESS_TOKEN
});

router.post('/payment', async (req,res,next) => {
    const {body} = req;
    // console.log('user-------------------->',body.user, 'user------------------->')
    try {
            const items_ml = body.cart.map((product) =>({
                id: product.id,
                title: product.title,
                unit_price: product.price,
                quantity: product.quantity,
                currency_id: "ARS",
            })); 
            const total = body.cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

            const quatityProducts = body.cart.reduce((acc, product) => acc + product.quantity, 0);
            //sacamos la cantidad de productos del carrito de compras
            // console.log('quatityProducts-------------------->',quatityProducts, 'quatityProducts-------------------->')

            //creamos la orden de compra.
                let newOrder = await Order.create({
                    status: 'creada',
                    purchaseCost: total,
                    payOrder: 'mercadopago',
                    // id: body.user.email,
                    paymentMethod: 'mercadopago',
                  
                })
                console.log(newOrder)

                let userOrder = await User.findByPk(body.user.email)
                console.log(userOrder)
                await newOrder.addUser(userOrder);
    
                //creamos el detalle de la orden de compra.
                // let newOrderDetail = await Orderdetail.create({
                //     purchasedamount: quatityProducts,
                //     purchaseprice: total,
                // });


            let preference = {
                items: items_ml,
                //urls a las q redirecciona el pago segun su estado
                back_urls: {
                    success: "https://e-commerce-production-9dbb.up.railway.app/result",//rutas deben ser de back no front.
                    failure: "https://e-commerce-production-9dbb.up.railway.app/result",
                    pending: ""
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
                notification_url: "https://0780-2803-9800-9011-46af-7586-16bb-a98b-7198.sa.ngrok.io/notification",
                statement_descriptor: "To-Mate",
            }
            // console.log('preference------------------->',preference, 'preference------------------->')
            mercadopago.preferences.create(preference)
            .then((resp)=> {
                //global.id = resp.body.id;
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



// router.get("/result", async (req, res) => {
//     //approved = APRO
//     //in_process = CONT (pendiente de pago)
//     //rejected = OTHE (rechazado)
//     console.info("EN LA RUTA DE PAGOS ");
//     const payment_id = req.query.payment_id;
//     console.log(payment_id);
//     const payment_status = req.query.status;
//     const external_reference = req.query.external_reference;
//     console.log(external_reference);
//     const merchant_order_id = req.query.merchant_order_id;
//     console.log(merchant_order_id);
//     let status = payment_status === "approved" ? "Approved" : "Failed";
//     console.log(status);

//     switch (status) {
//         case "Approved":
//           return res.redirect("https://testpf.vercel.app/checkout-success");
//         default:
//           return res.redirect("https://testpf.vercel.app/checkout-failure");
//       }
//   });
  
  router.get("/payment/:id", (req, res) => {
    const mp = new mercadopago(ACCESS_TOKEN);
    const id = req.params.id;

    console.info("Buscando el id", id);
    mp.get(`/v1/payments/search`, { id: id })
      .then((result) => {
        console.info("resultado", result);
        res.status(200).send({ result: result });
      })
      .catch((err) => {
        console.error("No se consulto:", err);
        res.status(400).send({ error: err });
      });
  });

router.post('/notification', async (req,res,next) => {
    const {query} = req;
    const body = req.body;
    console.log('req.body------------------->',body, 'req.body------------------->')

    if(query.id && query.topic == 'merchant-order'){
        console.log(`merchant-order:---->${query.id}------------mO`)
    }
    res.send('ok').status(200);
});

// mercadopago.merchant_orders.findById()

module.exports = router;