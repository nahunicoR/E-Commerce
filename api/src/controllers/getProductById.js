const { Product } = require("../db");

const getProductById = async (id) => {
    try {
        let detail = await Product.findByPk(id);
        if (detail) {
            return detail;
        }
        return 'No se encontro el producto'
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProductById };