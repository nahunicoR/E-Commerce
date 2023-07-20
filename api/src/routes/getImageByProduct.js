const { Router } = require('express');
const controller = require('../controllers');
/* Date Creation: January 5, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /images para las imagenes por productos
*/
const router = Router();

router.get('/:id/images', controller.getImageByProduct);

module.exports = router;