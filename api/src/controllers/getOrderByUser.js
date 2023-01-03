const { Order, Address } = require("../db");

/* Date Creation: January 2, 2023
      Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/orders para otener todos los usuarios con sus ordenes
*/



const getOrderByUser = async (userId) => {
    const id = userId
    try {
        const userOrdes = await Order.findAll({
            where:{
               userId: id,
            },
            include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
                model: Address,
                as: "addressorder",
                atributes:["mainstreet", "number","postalcode",
                            "street1", "street2", "name", "phonenumber",
                            "additonals"]
            }]
        });
        if (userOrdes) {
           return userOrdes;
        } else {
            return {
                'message': 'Usuario no tiene ordenes registradas.',
                'error': `El id: ${id} no existe`
            };
        } 
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getOrderByUser };