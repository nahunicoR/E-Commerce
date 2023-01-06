/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /address/id para eliminar un domicilio del Usuari
*/

const { Address } = require("../db");

const deleteAddressUser = async (id,userEmail) => {
    try {

        const street = await Address.findOne({
            where: {
                id: id,
                userEmail: userEmail
                
            },
          });
          
          if (street) {
            await street.destroy(); // deletes the row
          }

        return `Se elimino el domicilio con id: ${id} y usuario: ${userEmail}`;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteAddressUser };