const { Router } = require('express');
const { getOrdersUsers } = require('../controllers/getOrdersUsers');
const {User, Order} = require('../db');

/* Date Creation: December 13, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/orders para otener todos los usuarios
*/
const router = Router();

router.get('/', async (req, res, next) => {
    try {
      const data = await getOrdersUsers();
      return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;