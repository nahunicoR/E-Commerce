const { Router } = require('express');
//const { Sequelize } = require('sequelize');
const { Orderdetail, Product } = require('../db');
const  nodemailer = require('nodemailer');
//tyvvqqdwlvqtjzeu
const router = Router();




/* Date Creation: December 26, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /oders para crear el detalle de la orden de compra
*/
router.post('/', async (req, res, next) => {
    
    let productosCorreo = " "; //Para controlar la cadena de productos que se han vendido

    const { orderId, email, name, products } = req.body;
    console.log(products);
    console.log(orderId);
    //Recorre el arreglo de productos para asignar orderId a cada producto
    products.forEach(element => {
        element.orderId = orderId;
      });
    
      console.log(products);
    try {
        //Inserta los productos en la tabla orderdetail
        let newOrder = await Orderdetail.bulkCreate(
            products
        );

        /* Si todo salió bien, descuenta los stocks de los productos,
           toma cada producto y le resta la cantidad comprada al stock
        */
         await products.forEach(element => {
               const odetail = updateStock(element.productId,element.purchasedamount);
               productosCorreo = productosCorreo + element.title + ": " + element.purchasedamount + "  "
         });

         /*
           Envía correo al usuario sobre lo comprado
         */ 
           
         const send = await sendMail(email,name, productosCorreo)


        return res.status(200).json({
            "message:": "Detalles agregados a la orden.",
            "Orden": newOrder
        });
        

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            'message': "El paquete de datos no puede ser procesado.",
            'error': 'Valores no válidos'
        })
    }
});


//Función asíncrona que permite el descuento del stock en la base de datos
async function updateStock(id,purchasedamount){
    
    let od = await Product.findByPk(id)
    od.stock = od.stock - purchasedamount
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
      pass: "aqui va la clave", // generated ethereal password
    },
   });  //Fin de función

  
    // enviar correo con objeto de transporte definido
    return transporter.sendMail({ //await
      from: '"Su compra realizada." <pruebadecorreo@example.com>', // sender address
      to: to,
      subject: "Gracias por su compra " + name, // Subject line
      //"Enviando correo de prueba desde la API E-Commerce generado por Alejandro Téllez.", // plain text body
      text: 'Productos comprados:  ' + orderproducts,
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