const { Order, Address } = require("../db");
const {response} = require("../utils");
/* Date Creation: January 2, 2023
      Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/orders para otener todos los usuarios con sus ordenes
*/
module.exports = async (req,res,next) => {
    const {userEmail} = req.params;
    try {
        const userOrdes = await Order.findAll({
            where:{
                userEmail: userEmail,
            },
            atributes:["id", "number","purchaseCost",
                            "payOrder", "paymentMethod", "status", "createdAt"]
        });
        if (!userOrdes) {
            return {
                message: 'Usuario no tiene ordenes registradas.',
                error: `El id: ${userEmail} no existe`
            };
        }
        return response(res,200,userOrdes);
    } catch (error) {
        next(error);
    };
};
