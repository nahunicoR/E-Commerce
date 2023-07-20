const {response} = require("../utils");
const { Op } = require('sequelize');
const { Product } = require('../db');

module.exports =  async (req, res, next) => {
    const { title } = req.query; 
    if (title) {
        try {
            const ProductName = await Product.findAll({
                where: {
                    title: {
                        [Op.iLike] : `%${title}%`
                    }
                }
            });
            ProductName.length > 0 ? response(res,200,ProductName) : response(res,404,{
                message: `Producto: ${title} no encontrado`,
                error : '404 Product Not Found'
            }); 
        } catch (error) {
            next(error)   
        }
    };
};