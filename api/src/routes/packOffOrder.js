const { Router } = require('express');
//const { Sequelize } = require('sequelize');
const { Orderdetail, Product, Order } = require('../db');
const  nodemailer = require('nodemailer');
const { packOffOrder } = require('../controllers/packOffOrder');
//tyvvqqdwlvqtjzeu
const router = Router();
let productosCorreo = 0; //Para controlar la cadena de productos que se han vendido

/* Date Creation: January 3, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /oder para Actualizar una orden de compra
*/
router.put('/', async (req, res, next) => {
    
   const { orderId, email, name, status} = req.body;
   try {

        // //Cambia de estado de la orden

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
              console.log(element.productId, element.purchasedamount)
              //Actualiza el stock con cada producto
              if (status === "cancelada") {
                 const odetail = updateStock(element.productId,element.purchasedamount,status);
                 productosCorreo++
              }   
             });   
             console.log(name,email,productosCorreo)  
            
             // Envía correo al usuario 
              
              
              const send = await sendMail(email,name, productosCorreo, status)
            return res.status(200).json({
              
              "message:": "Orden " + status,
              "Orden": orderId,
              data
            }); 

           } else {
             return res.status(404).json({message:"No se encontró la orden."});
           }

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            'message': "El paquete de datos no puede ser procesado.",
            'error': 'Valores no válidos'
        })
    }
});


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
     if (err) res.status(500).send({success: false, error: err.message});
      return res.status(200).send({
        success: true,
        message: "Correo enviado."
     });
     
  });
  }
  //Si es surtida o en proceso
  console.log(status);
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
     if (err) res.status(500).send({success: false, error: err.message});
      return res.status(200).send({
        success: true,
        message: "Correo enviado."
     });
     
  });
}


} // Fin de función

module.exports = router;