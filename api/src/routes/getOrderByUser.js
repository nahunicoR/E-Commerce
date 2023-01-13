const { Router } = require('express');
const { getOrderByUser } = require('../controllers/getOrderByUser');
const {User, Order} = require('../db');

/* Date Creation: January 2, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/orders para otener todos los usuarios
*/
const router = Router();

router.get('/:userEmail/orders', async (req, res, next) => {
    const userEmail = req.params.userEmail;
    try {
      const data = await getOrderByUser(userEmail);
      return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;