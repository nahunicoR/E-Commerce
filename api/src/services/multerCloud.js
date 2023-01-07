const multer = require('multer');

// Create Date: december 8, 2022
// Author: Alejandro Téllez
// Description: Este módulo define los valores de conexión a la nube cloudinary


module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 10485760 }  //10 megas de tamaño de cada imagen
  
  
});