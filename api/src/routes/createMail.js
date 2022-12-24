const { Router } = require('express');
const  nodemailer = require('nodemailer');

const router = Router();

/* Date Creation: December 21, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /mail para el correo de compra para el usuario
   //tyvvqqdwlvqtjzeu
   Usuarios de Prueba:
   nahunico.r@gmail.com           Nahuel
   wzseba@gmail.com               Sebastian
   atacolmx@gmail.com             Alejandro
   florsgroy@gmail.com            Florencia Sgroy
   m6nuel@gmail.com               Jesús Manuel
   silviacarolina9680@gmail.com   Silvia
*/


router.post('/mail', (req, res, next) => { //async

  const { to, text, name } = req.body;
    // crear un objeto transportador reutilizable utilizando el transporte SMTP predeterminado
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "atacolmx@gmail.com", // generated ethereal user
      pass: "aqui va la contraseña", // generated ethereal password
    },
  });

  
 
    // enviar correo con objeto de transporte definido
    return transporter.sendMail({ //await
      from: '"Enviado desde API E-Commerce" <pruebadecorreo@example.com>', // sender address
      // "atacolmx@gmail.com, nahunico.r@gmail.com, wzseba@gmail.com, florsgroy@gmail.com, m6nuel@gmail.com", // list of receivers
      to: to,
      subject: "Correo creado con librería nodemailer", // Subject line
      //"Enviando correo de prueba desde la API E-Commerce generado por Alejandro Téllez.", // plain text body
      text: name + ' ' +text,
      //html: "<b>Hello world?</b>", // html body
  }, (err, info) => {
    if (err) res.status(500).send({success: false, error: err.message});
    return res.status(200).send({
        success: true,
        message: "Correo enviado."
    });
  });

});

module.exports = router;