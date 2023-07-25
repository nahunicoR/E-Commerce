const {User, Order} = require('../db');
const {response} = require("../utils")

module.exports = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await User.findOne({
          where: { 
              id: id,
          },
          include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
              model: Order,
              as: "ordenes",
              atributes:["purchasecost", "payorder","paymentmethod"]
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