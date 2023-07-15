const { Router } = require('express');
const { getUsers } = require('../controllers/getUsers');
const {response} = require('../utils')

/* Date Creation: December 12, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/all para otener todos los usuarios
*/
const router = Router();

router.get('/all', async (req, res, next) => {
    try {
      const data = await getUsers();
      response(res,200,data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;