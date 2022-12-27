const { Router } = require('express');
const { Orderdetail } = require('../db');
const router = Router();

/* Date Creation: December 26, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /oders para crear el detalle de la orden de compra
*/
router.post('/', async (req, res, next) => {
    const { orderId, products } = req.body;
    console.log(products);
    console.log(orderId);
    //Recorre el arreglo de productos
    products.forEach(element => {
        element.orderId = orderId;
      });
    
      console.log(products);
    try {
      
        let newOrder = await Orderdetail.bulkCreate(
            products
        );
        return res.status(200).json({
            "message:": "Detalles agregados a la orden.",
            "Orden": newOrder
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            'message': "El status no es correcto",
            'error': 'Error en status, debe ser status = creada'
        })
    }
});

module.exports = router;