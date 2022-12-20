/* Date Creation: December 13, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/orders para otener todos los usuarios con sus ordenes
*/

const { User, Order } = require("../db");

const getOrdersUsers = async () => {
    try {
        const usersDb = await User.findAll({
            //Para traer las ordenes
            include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
                model: Order,
                as: "ordenes",
                atributes:["purchasecost", "payorder","paymentmethod"]
            }]
        });
        
        return [...usersDb];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getOrdersUsers };