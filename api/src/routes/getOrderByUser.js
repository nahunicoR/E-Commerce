const { Router } = require('express');
const controller = require('../controllers')
/* Date Creation: January 2, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/orders para otener todos los usuarios
*/
const router = Router();

router.get('/:userEmail/orders', controller.getOrderByUser);

module.exports = router;