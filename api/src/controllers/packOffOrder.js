const { Order, Orderdetail, Product  } = require("../db");
const {response} = require("../utils");
const  nodemailer = require('nodemailer');

let productosCorreo = 0; //Para controlar la cadena de productos que se han vendido

module.exports = async (req,res,next) => {
    const { orderId, email, name, status} = req.body;
    try {
         //Cambia de estado de la orden
         let changeOrder = await changeStateOrder(orderId,status);
         //Obtiene el detalle de la orden en la tabla orderdetail
         const data = await Order.findOne({
             where: { 
                 id: orderId,
             },
             include: [{
                 model: Orderdetail,
                 as: "headorder",
                 atributes:["productId", "purchasedamount"]
             }]     
           }); 
            if (data) { //Obtiene todos los productos de la orden
              //Envía cada productos y cantidad comprada para aumentar el stock
              data.headorder.forEach(element => {
               //Actualiza el stock con cada producto
               if (status === "cancelada") {
                  const odetail = updateStock(element.productId,element.purchasedamount,status);
                  productosCorreo++
               }   
              });   
              // Envía correo al usuario                
               const send = await sendMail(email,name, productosCorreo, status)
             return response(res,200,{
               "message:": "Orden " + status,
               "Orden": orderId,
               data
             }); 
            } else {
              return response(res,404,{message:"No se encontró la orden."});
            }
     } catch (error) {
         console.log(error)
         next(error);
     };
 };
 
 //Función asíncrona que permite el descuento del stock en la base de datos
 async function changeStateOrder(orderId,state){
   let ostatus = await Order.findByPk(orderId)
   ostatus.status = state
   await ostatus.save();
 };
 
 //Función asíncrona que permite el aumento del stock en la base de datos
 async function updateStock(id,purchasedamount){
     let od = await Product.findByPk(id)
       od.stock = od.stock + purchasedamount
       //Se crea la cadena de productos para enviar correo       
     await od.save();     
 };
  
 async function sendMail(to, name, orderproducts, status){
     // crear un objeto transportador reutilizable utilizando el transporte SMTP predeterminado
    let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
       user: "atacolmx@gmail.com", // generated ethereal user
       pass: "aqui va la clave", // generated ethereal password
     },
    });  //Fin de función
  
    //Si es cancelada
   if (status === "cancelada"){ 
     // enviar correo con objeto de transporte definido
     return transporter.sendMail({ //await
       from: '"Su compra ha sido cancelada." <pruebadecorreo@example.com>', // sender address
       to: to,
       subject: "Cancelación de su compra " + name, // Subject line
       //"Enviando correo de prueba desde la API E-Commerce generado por Alejandro Téllez.", // plain text body
       text: 'Productos cancelados:  ' + orderproducts,
       //html: "<b>Hello world?</b>", // html body
      }, (err, info) => {
      if (err) response(res,500,{success: false, error: err.message});
       return response(res,200,{
         success: true,
         message: "Correo enviado."
      });
   });
   }

   //Si es surtida o en proceso
   if (status === "proceso"){ 
     // enviar correo con objeto de transporte definido
     return transporter.sendMail({ //await
       from: '"Productos empacados y enviados." <pruebadecorreo@example.com>', // sender address
       to: to,
       subject: name + ", hemos enviado tus productos.", // Subject line
       //"Enviando correo de prueba desde la API E-Commerce generado por Alejandro Téllez.", // plain text body
       text: 'Productos enviados:  ' + orderproducts,
       //html: "<b>Hello world?</b>", // html body
      }, (err, info) => {
      if (err) response(res,500,{success: false, error: err.message});
       return response(res,200,{
         success: true,
         message: "Correo enviado."
      });
   });
 }
};
