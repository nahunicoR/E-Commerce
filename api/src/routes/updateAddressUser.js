const { Router } = require('express');
const controller = require('../controllers');

/* Date Creation: December 12, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /user/id para otener actualizar el estado del Usuario
*/

const router = Router();

router.put('/:id', controller.updateAddressUser);

module.exports = router;