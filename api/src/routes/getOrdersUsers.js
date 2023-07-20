const { Router } = require('express');
const controller = require('../controllers');

/* Date Creation: December 13, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/orders para otener todos los usuarios
*/
const router = Router();

router.get('/', controller.getOrdersUsers);

module.exports = router;