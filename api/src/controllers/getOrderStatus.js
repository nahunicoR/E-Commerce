/* Date Creation: January 3, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /addresses/?status/products para obtener las ordenes y sus productos
*/

const { Order, Orderdetail } = require("../db");

const getOrderStatus = async (req, res, next) => {
    const status = req.params.status
    try {
        const orderDb = await Order.findAll(status);
        if (orderDb) {
            Order.getHeadorder();

        }
        return res.json(userDb);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getOrderStatus };