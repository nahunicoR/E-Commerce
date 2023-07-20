const { Router } = require('express');
const controller = require('../controllers');

/* Date Creation: January 3, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /addresses/:id/streets para otener todas los domicilios del usuario
*/
const router = Router();

router.get('/:status/products', controller.getOrderStatus);

module.exports = router;