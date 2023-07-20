const { Router } = require('express');
const controller = require('../controllers');
const router = Router();
/* Date Creation: December 13, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/:id/orders para otener todos los usuarios
*/
router.get('/:iduser/ordenes', controller.getUserIdOrders);

module.exports = router;