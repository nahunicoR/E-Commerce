
const { Order, Orderdetail } = require("../db");
const {response} = require("../utils");

module.exports = async (req, res, next) => {
    const status = req.params.status;
    try {
        const data = await Order.findOne({
          where: { 
              status: status,
          },
          include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
              model: Orderdetail,
              as: "headorder",
              atributes:["purchasedamount", "purchaseprice"]
          }]
        }); 
        if (data) {
          return response(res,200,data);
        } else {
          return response(res,404,{message:"No se encontraron ordenes con ese status"});
        }  
      } catch (error) {
          next(error);
      };
};