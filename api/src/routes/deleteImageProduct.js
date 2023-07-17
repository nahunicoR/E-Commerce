/* Date Creation: January 6, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /product para eliminar la imagen del producto
*/
const { Router } = require('express');
const controller = require('../controllers');
const router = Router();

router.delete('/:id', controller.deleteImageProducts);

module.exports = router;