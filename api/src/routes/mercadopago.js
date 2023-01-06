const express = require('express');
const router = express.Router();
const { Product, Order, Orderdetail, User, Address } = require('../db.js');
const mercadopago = require('mercadopago');
const { merchant_orders } = require('mercadopago');
const {ACCESS_TOKEN} = process.env;


mercadopago.configure({
    access_token: ACCESS_TOKEN
});

    //---------------------------------------------------------------------------------->
    //POST DE PREFERENCIA HASTA EL MOMENTO INDIVIDUAL SIN CARRITO DE COMPRAS
router.post('/payment',  (req,res,next) => {
    // const {cartItems, user} = req.body;
    // const ml_cart = cartItems.map(item => {
    //     return {
    //         id: item.id,
    //         title: item.name,
    //         quantity: item.quantity,
    //         description: item.description,
    //         image: item.image,
    //         currency_id: 'ARS',
    //         unit_price: item.price
    //     }
    // })
    const prod = req.body
    const preference = {
        items: [
            {
                id: prod.id,
                title: prod.title,
                currency_id: "ARS",
                picture_url: prod.image,
                description: prod.description,
                category_id: "art",
                quantity: prod.quantity,
                unit_price: prod.price
            }
        ],
        // payer: {
        //     name: user.give_name,
        //     surname: user.family_name,
        //     email: user.email,
        // },
        back_urls: {
            success: "",
            failure: "",
            pending: ""
        },
        notification_url: "https://4e59-201-254-94-96.sa.ngrok.io/notification",
        // payment_methods: {
        //     excluded_payment_methods: [
        //         {
        //             id: ""
        //         }
        //     ],
        //     excluded_payment_types: [
        //         {
        //             id: "ticket"
        //         }
        //     ],
        //     installments: 3
        // },
        binary_mode: true,
    }
    mercadopago.preferences.create(preference)
    .then((resp)=> {
        res.json(resp.body.init_point)
    }).catch((err)=> {
        console.log(err)
        res.send({error: err.message})
        next(err)
    });
});

router.post('/notification', async (req,res,next) => {
    const {body,query} = req;
    const topic = query.topic;

    console.log('Hola soy Query',{query})
    console.log('Hola soy Topic',{topic})
    var merchantOrder;
    switch(topic){
        case 'payment':
            const paymentId = query.id || query['data.id'];
            console.log(topic,'getting payment------>',paymentId);
            const payment = await mercadopago.payment.findById(paymentId);
            console.log(payment,'payment-------->');
            //console.log('payment body',payment.body)
            merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
            //console.log('merchantOrder',merchantOrder.body)
            break;
        case 'merchant_order':
            const orderId = query.id;
            console.log(topic,'getting merchant_order---->',orderId);
            merchantOrder = await mercadopago.merchant_orders.findById(orderId);
            //console.log('merchantOrder',merchantOrder.body)
            break;            
    }
    console.log('merchantOrder------------------->',merchantOrder)
    let paidAmount = 0;
    // merchantOrder.payments.forEach(payment => {
    //     if(payment.status === 'approved'){
    //         paidAmount += payment.transaction_amount;
    //     }
    // });
    // if(paidAmount >= merchantOrder.body.total_amount){
    //     console.log('----EL PAGO SE COMPLETO!!!----')
    // }else{
    //     console.log('----EL PAGO NOOOO SE COMPLETO----')
    // }

    res.send('ok')
});
//---------------------------------------------------------------------------------->
//  MODELO DE PREFERENCIA DE MERCADO PAGO


// const preference = {
//         items: [
//             {
//                 id: "item-ID-1234",
//                 title: "Mi producto",
//                 currency_id: "ARS",
//                 picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
//                 description: "Descripción del Item",
//                 category_id: "art",
//                 quantity: 1,
//                 unit_price: 75.76
//             }
//         ],
//         payer: {
//             name: "Juan",
//             surname: "Lopez",
//             email: "user@email.com",
//             phone: {
//                 area_code: "11",
//                 number: "4444-4444"
//             },
//             identification: {
//                 type: "DNI",
//                 number: "12345678"
//             },
//             address: {
//                 street_name: "Street",
//                 street_number: 123,
//                 zip_code: "5700"
//             }
//         },
//         back_urls: {
//             success: "https://www.success.com",
//             failure: "http://www.failure.com",
//             pending: "http://www.pending.com"
//         },
//         auto_return: "approved",
//         payment_methods: {
//             excluded_payment_methods: [
//                 {
//                     id: "master"
//                 }
//             ],
//             excluded_payment_types: [
//                 {
//                     id: "ticket"
//                 }
//             ],
//             installments: 12
//         },
//         notification_url: "https://www.your-site.com/ipn",
//         statement_descriptor: "MINEGOCIO",
//         external_reference: "Reference_1234",
//         expires: true,
//         expiration_date_from: "2016-02-01T12:00:00.000-04:00",
//         expiration_date_to: "2016-02-28T12:00:00.000-04:00"
//     }


//---------------------------------------------------------------------------------->
//MODELO DE MUESTRA VIA VIDEO WANDA MERCADO PAGO

// router.get('/',async (req, res, next) => {
//     const id_orden = 1;//harcodeado
//     const carrito = [
//         {title:"Producto 1", unit_price: 100, quantity: 1},
//         {title:"Producto 2", unit_price: 200, quantity: 1},
//         {title:"Producto 3", unit_price: 300, quantity: 1}
//     ];
//     los tomando el carrito completo de la orden lo mapeamos por que así lo pide MP.
//     const items_ml = carrito.map((product) => {
//         return {
//             indispensable estas 3 propiedades al menos.
//             title: product.title,
//             unit_price: product.unit_price,
//             quantity: product.quantity
//         };
//         });
//         creamos la preferencia de pago
//         let preference = {
//             agregamos el carrito mapeado y el id de la orden.
//             items: items_ml,
//             external_reference: `${id_orden}`,
//             payment_methods: {
//                 excluimos el pago atm que es el pago en cajero automatico.
//                 excluded_payment_methods: [
//                     {
//                         id: "atm"
//                     }
//                 ],
//                 cantidad de cuotas disponibles.
//                 installments: 6
//             },
//             redireccionamos a las rutas de exito, fracaso y pendiente. como lo solicita MP
//             back_urls: {
//                 success: 'http://localhost:3000/checkout-success',
//                 failure: 'http://localhost:3000/mercadopago/failure',
//                 pending: 'http://localhost:3000/mercadopago/pending'
//                 },
//             auto_return: 'approved'
//         };
//         creamos la preferencia de pago para MP.
//        await mercadopago.preferences.create(preference)
//         .then((response) => {
//             en este console.log, se encuentra el detalle de todo lo que pide MP
//             tambien se puede observar el init_point que es el link de pago.  init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=188528496-62bb99b1-75f8-48fb-a8b4-caa3baf222b7',
//             y el id que es el id de la preferencia de pago NO es INTEGER, es alphaNumerico.  id: '188528496-62bb99b1-75f8-48fb-a8b4-caa3baf222b7',
//             console.info('respondio');
//             global.id = response.body.id;
//             console.log(response.body)
//             res.json({ id: global.id });
//         })
//         .catch((error) => {
//             console.log(error);
//             next(error)
//         });
// });

module.exports = router;