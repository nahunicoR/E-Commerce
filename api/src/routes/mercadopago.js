const express = require('express');
const router = express.Router();
const { Product, Order, Orderdetail, User, Address } = require('../db.js');
const mercadopago = require('mercadopago');
const { REAL } = require('sequelize');
const {ACCESS_TOKEN} = process.env;


mercadopago.configure({
    access_token: ACCESS_TOKEN
});

    //Por favor, consologuear tanto payment, como probar el endpoint en notification url con protocolo seguro (https)
    //herramienta para ello: ngrok.  https://ngrok.com/    
    //una vez descargado e instalado simplemente ejecutar y aparecerá una terminal donde hay que tipear EN ESA LINEA DE TERMINAL TAL CUAL ESTA DEBAJO.
    //ngrok http http://localhost:3001        

    //Luego entrega puerto que debe ser reemplazar y añadido a /notification 

    //---------------------------------------------------------------------------------->
    //POST DE PREFERENCIA HASTA EL MOMENTO INDIVIDUAL SIN CARRITO DE COMPRAS
router.post('/payment', async (req,res,next) => {
    const {body} = req;
    // console.log('user-------------------->',body.user, 'user------------------->')
    // console.log('cart-------------------->',body.cart, 'cart------------------->')
    try {
        //mapeamos lo que llega del front en el carrito de compras y/o details user es {}.
            const items_ml = body.cart.map((product) =>({
                id: product.id,
                title: product.title,
                unit_price: product.price,
                quantity: product.quantity,
                currency_id: "ARS",
            })); 
            // console.log('items_ml-------------------->',items_ml, 'items_ml-------------------->')
            //creamos la preferencia de pago con el carrito de compras y/o details user {}.

            const total = body.cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
            //sacamos el total del carrito de compras
            console.log('total-------------------->',total, 'total-------------------->')
            //creamos la orden de compra, solo inicializamos sin información realmente fiable.
            //EN DUDA DE SI CREAR AQUI Y MODIFICAR AQUI LOS MODELOS. 
            const newPurchase = await Order.create({
                purchaseCost: total,
            },
            {
                include: {
                    model: User,
                    where:{
                        email: body.user.email,
                        name: body.user.name,
                    },
                },
            });
                

            let preference = {
                items: items_ml,
                payer: {
                    name: body.user.name,
                    email: body.user.email,
                },
                //urls a las q redirecciona el pago segun su estado
                back_urls: {
                    success: "http://localhost:3000/checkout-success",
                    failure: "",
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
                    //cantidad de cuotas para pruebas es 0.
                    installments: 0
                },
                //anula la posibilidad de pago en efectivo
                binary_mode: true,
                notification_url: "https://cb05-201-254-94-96.sa.ngrok.io/notification",
            }
            console.log('preference------------------->',preference, 'preference------------------->')
            mercadopago.preferences.create(preference)
            .then((resp)=> {
                 console.log(resp)
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
router.post('/notification', async (req,res,next) => {
    console.log('req------------------->',req.body, 'req------------------->')
    try {
        res.status(200).send('ok')
    } catch (error) {
        console.log(error);
        next(error);
        return res.status(500).send({message:error});
    }
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