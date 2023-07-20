const { Product } = require("../db");
const products = require('../controllers/objProducts');
const {response} = require('../utils');

module.exports = async (req,res,next) => {
    try {
        const ProductosDb = await Product.findAll();
        if (!ProductosDb.length) {
            const load = await Product.bulkCreate(products);
            return response(res,200,load);
        };
        const resp = await ProductosDb.map( product => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                category: product.category,
                description: product.description,
                image: product.image,
                material: product.material,
                stock: product.stock,
            }
        });
        return response(res,201,resp);
    } catch (error) {
        next(error);
    };
};