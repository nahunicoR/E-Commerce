const { Router } = require('express');
const controller = require('../controllers');
const {User, Order} = require('../db');
const {response} = require("../utils")

/* Date Creation: December 13, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/:id/orders para otener todos los usuarios
*/
const router = Router();

router.get('/:iduser/ordenes', async (req, res, next) => {
    const id = Number(req.params.iduser);
    try {
      const data = await User.findOne({
        where: { 
            id: id,
        },
        include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
            model: Order,
            as: "ordenes",
            atributes:["purchasecost", "payorder","paymentmethod"]
        }]
      }); 
      if (data) {
        return response(res,200,data);
      } else {
        return response(res,404,{message:"No se encontró usuario"});
      }  
    } catch (error) {
        next(error);
    }
});

module.exports = router;

