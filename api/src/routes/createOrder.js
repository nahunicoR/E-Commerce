const { Router } = require('express');
const { Order } = require('../db');
const router = Router();

/* Date Creation: December 16, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /oder para crear la orden de compra
*/
router.post('/create', async (req, res, next) => {
    const { purchaseCost, payOrder, paymentMethod, status, userId } = req.body;
    try {
      if (req.body.status === "creada"){
        let newOrder = await Order.create({
            purchaseCost,
            payOrder,
            paymentMethod,
            status,
            userId
        });
        res.status(200).json({
            "Id order" : newOrder.id, 
            "Id user" : newOrder.userId
        });
    } else {
        res.status(400).json({
            'message': "El status no es correcto",
            'error': 'Error en status, debe ser status = creada'
        })
    }
        
    } catch (error) {
        console.log(error)
        
    }
});

module.exports = router;