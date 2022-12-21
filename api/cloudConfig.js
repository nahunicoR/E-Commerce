// Create Date: december 8, 2022
// Author: Alejandro Téllez
// Description: Este módulo define los valores de conexión a la nube cloudinary

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dlhyepzvc',                      //Nombre del repositorio
  api_key: '811942745317868',                   //Llave de acceso
  api_secret: 'w1rVQWREVdzu08AfbS3TwFwLq9I',    //Token permanente
  preset: 'ecomerce'                            //Ambiente pre establecido (Esquema)
});

module.exports = cloudinary;