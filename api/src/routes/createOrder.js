const { Router } = require('express');
const { Order } = require('../db');
const router = Router();

/* Date Creation: December 16, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /oder para crear la orden de compra
*/
router.post('/', async (req, res, next) => {
    const { purchaseCost, payOrder, paymentMethod, status, userEmail, addressorderId } = req.body;
    try {
      if (req.body.status === "creada"){
        let newOrder = await Order.create({
            purchaseCost,
            payOrder,
            paymentMethod,
            status,
            userEmail,
            addressorderId
        });
        res.status(200).json({
            "Orden:" : newOrder.id, 
            "Usuario:" : newOrder.userEmail,
            "Domicilio:": newOrder.addressorderId  
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