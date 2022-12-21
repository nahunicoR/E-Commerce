const multer = require('multer');

// Create Date: december 8, 2022
// Author: Alejandro Téllez
// Description: Este módulo define los valores de conexión a la nube cloudinary


module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 }   //500 megas de capacidad
});