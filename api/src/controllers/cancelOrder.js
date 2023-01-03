const { Order, Orderdetail } = require("../db");

/* Date Creation: December 29, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /oders para Cancelar una orden de compra
*/

const cancelOrder = async (id) => {
    try {
        let order = await Order.findByPk(id)
        if (order) {
            Order.getHeadorder();
        }
        
        return res.json(order)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { cancelOrder };