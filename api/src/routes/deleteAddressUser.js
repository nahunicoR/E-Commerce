/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /address/id para eliminar el domicilio del Usuario
*/
const { Router } = require('express');
const controller = require('../controllers');

const router = Router();

router.delete('/', controller.deleteAddressUser);

module.exports = router;