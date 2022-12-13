const { Router } = require('express');
const { getUserIdOrders } = require('../controllers/getUserIdOrders');
const {User, Order} = require('../db');

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
        return res.status(200).json(data);
      } else {
        return res.status(404).json({message:"No se encontró usuario"});
      }  
      
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
});

module.exports = router;

