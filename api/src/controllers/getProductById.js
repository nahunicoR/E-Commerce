const { Product } = require("../db");
const {response} = require('../utils')

module.exports = async (req,res,next) => {
    const {id} = req.params;
    try {
        const detail = await Product.findByPk(id);
            if (detail) {
                return response(res,200,detail);
            }
            return response(res,200,{
                message: 'Producto no Encontrado',
                error: `El id: ${id} no existe`
            });
    } catch (error) {
      next(error);  
    };
};