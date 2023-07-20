/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /addresses/?id/streets para otener todos los usuarios y sus domicilios
*/
const { User, Address } = require("../db");
const {response} = require("../utils");

module.exports = async (req, res,next) => {
    const {email} = req.params;
    try {
        const data = await User.findOne({
          where: { 
              email: email,
          },
          include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
              model: Address,
              as: "streets",
              atributes:["mainstreet", "number","postalcode",
                          "street1", "street2", "name", "phonenumber",
                          "additonals"]
          }]
        }); 
        if (data) {
          return response(res,200,data);
        } else {
          return response(res,404,{message:"No se encontró usuario"});
        }  
      } catch (error) {
          next(error);
      };
};
