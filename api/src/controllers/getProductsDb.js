const { Product } = require("../db");
const {response} = require('../utils');

module.exports = async (req,res,next) => {
    try {
        const productosDb = await Product.findAll();
        return response(res,201,[...productosDb]);
    } catch (error) {
        next(error);
    };
};