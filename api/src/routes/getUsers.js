const { Router } = require('express');
const controller = require('../controllers');
const router = Router();
/* Date Creation: December 12, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/all para otener todos los usuarios
*/
router.get('/all', controller.getUsers);

module.exports = router;