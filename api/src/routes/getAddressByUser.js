const { Router } = require('express');
const controller = require('../controllers');

/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /addresses/:id/streets para otener todas los domicilios del usuario
*/
const router = Router();

router.get('/:email/streets', controller.getAddressByUser);

module.exports = router;