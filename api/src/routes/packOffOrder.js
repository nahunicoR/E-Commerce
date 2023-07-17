const { Router } = require('express');
const controller = require('../controllers');
const router = Router();
/* Date Creation: January 3, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /oder para Actualizar una orden de compra
*/
router.put('/', controller.packOffOrder);

module.exports = router;