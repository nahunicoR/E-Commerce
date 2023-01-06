const { Router } = require('express');
const { getOrderStatus } = require('../controllers/getOrderStatus');
const {Order, Orderdetail} = require('../db');

/* Date Creation: January 3, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /addresses/:id/streets para otener todas los domicilios del usuario
*/
const router = Router();

router.get('/:status/products', async (req, res, next) => {
    const status = req.params.status;
    try {
      const data = await Order.findOne({
        where: { 
            status: status,
        },
        include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
            model: Orderdetail,
            as: "headorder",
            atributes:["purchasedamount", "purchaseprice"]
        }]
        
      }); 
      if (data) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({message:"No se encontraron ordenes con ese status"});
      }  
      
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
});

module.exports = router;