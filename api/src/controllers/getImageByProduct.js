/* Date Creation: January 05, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio obtener los productos y sus imágenes
*/
const {response} = require("../utils");
const { Image, Product } = require("../db");

module.exports = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await Product.findOne({
          where: { 
              id: id,
          },
          include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
              model: Image,
              as: "imageproduct",
              atributes:["url", "folder"]
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