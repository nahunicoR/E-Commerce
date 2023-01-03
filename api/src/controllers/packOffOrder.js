const { Order, Address } = require("../db");

/* Date Creation: January 2, 2023
      Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /order cambiar el estado de la orden
*/



const packOffOrder = async (orderid, status) => {
    const id = orderid
    try {
        const order = await Order.findByPk(id);
        order.status = status
        await order.save();
        if (order) {
           return order;
        } else {
            return {
                'message': 'Orden no ha sido encontrada.',
                'error': `El id: ${id} no existe`
            };
        } 
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { packOffOrder };