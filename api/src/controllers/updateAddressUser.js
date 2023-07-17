/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /address/id modificar el domicilio de un cliente
*/
const { Address } = require("../db");
const {response} = require("../utils");

module.exports = async (req,res,next) => {
    const {id} = req.params;
    const { mainstreet, number, postalcode, street1, street2, name, phonenumber, additionals} = req.body;
    try {
        let update = await updateAddressUser(id);
        update.mainstreet     = mainstreet;
        update.number         = number;
        update.postalcode     = postalcode;
        update.street1        = street1;
        update.street2        = street2;
        update.name           = name;
        update.phonenumber    = phonenumber;
        update.additionals    = additionals; 
        await update.save()
        response(res,200,{
            'message': 'Actualizacion de Domicilio exitosa',
        });
    } catch (error) {
        next(error) 
    };
};