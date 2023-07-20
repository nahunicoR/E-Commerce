const { Order } = require('../db');
const {response} = require("../utils");

module.exports =  async (req, res, next) => {
    const { purchaseCost, payOrder, paymentMethod, status, userEmail, addressorderId } = req.body;
    try {
      if (status === "creada"){
        let newOrder = await Order.create({
            purchaseCost,
            payOrder,
            paymentMethod,
            status,
            userEmail,
            addressorderId
        });
        response(res,200,{
            "Orden:" : newOrder.id, 
            "Usuario:" : newOrder.userEmail,
            "Domicilio:": newOrder.addressorderId  
        });
    } else {
        response(res,400,{
            'message': "El status no es correcto",
            'error': 'Error en status, debe ser status = creada'
        })
    }
    } catch (error) {
        next(error);
    }
};
