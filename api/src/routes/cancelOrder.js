const { Router } = require('express');
//const { Sequelize } = require('sequelize');
const { Orderdetail, Product, Order } = require('../db');
const  nodemailer = require('nodemailer');
const { cancelOrder } = require('../controllers/cancelOrder');
//tyvvqqdwlvqtjzeu
const router = Router();
let productosCorreo = 0; //Para controlar la cadena de productos que se han vendido

/* Date Creation: December 29, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /oders para Cancelar una orden de compra
*/
router.delete('/', async (req, res, next) => {
    
   

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
              const odetail = updateStock(element.productId,element.purchasedamount);
              productosCorreo++
             });   

            /*
              Envía correo al usuario sobre lo cancelado
             */ 
              console.log(name,email,productosCorreo)  
              const send = await sendMail(email,name, productosCorreo)
            return res.status(200).json({
              
              "message:": "Orden Cancelada.",
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
     productosCorreo = productosCorreo + od.title + ": " + purchasedamount + "  ";
    await od.save();
    
};


async function sendMail(to, name, orderproducts){
  
    // crear un objeto transportador reutilizable utilizando el transporte SMTP predeterminado
   let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "atacolmx@gmail.com", // generated ethereal user
      pass: "tyvvqqdwlvqtjzeu", // generated ethereal password
    },
   });  //Fin de función

  
    // enviar correo con objeto de transporte definido
    return transporter.sendMail({ //await
      from: '"Su compra ha sido cancelada." <pruebadecorreo@example.com>', // sender address
      
      to: to,
      subject: "Cancelación su compra " + name, // Subject line
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

} // Fin de función

module.exports = router;