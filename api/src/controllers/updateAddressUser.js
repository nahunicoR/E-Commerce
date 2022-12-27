/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /address/id modificar el domicilio de un cliente
*/

const { Address } = require("../db");

const updateAddressUser = async (id) => {
    try {
        let detail = await Address.findByPk(id);
        console.log(detail);
        
        return detail;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { updateAddressUser };