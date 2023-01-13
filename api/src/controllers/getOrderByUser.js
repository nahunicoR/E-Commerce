const { Order, Address } = require("../db");

/* Date Creation: January 2, 2023
      Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/orders para otener todos los usuarios con sus ordenes
*/



const getOrderByUser = async (userEmail) => {
    
    try {
        const userOrdes = await Order.findAll({
            where:{
                userEmail: userEmail,
            },
            atributes:["id", "number","purchaseCost",
                            "payOrder", "paymentMethod", "status", "createdAt"]
            
        });
        if (userOrdes) {
           return userOrdes;
        } else {
            return {
                'message': 'Usuario no tiene ordenes registradas.',
                'error': `El id: ${userEmail} no existe`
            };
        } 
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getOrderByUser };