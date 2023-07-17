const { Router } = require('express');
const controller  = require('../controllers');
const router = Router();
/* Date Creation: December 12, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /user/id para otener actualizar el estado del Usuario
*/
router.put('/:useremail', controller.updateUser)

module.exports = router;