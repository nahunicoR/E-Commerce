/* Date Creation: December 13, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /users/?id/orders para otener todos los usuarios y sus ordenes
*/

const { User, Order } = require("../db");

const getUserIdOrders = async (req, res, next) => {
    const id = req.params
    try {
        const userDb = await User.findByPk(id);
        if (userDb) {
            User.getOrdenes();

        }
        return res.json(userDb);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserIdOrders };