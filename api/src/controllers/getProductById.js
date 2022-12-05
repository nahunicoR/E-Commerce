const { Product } = require("../db");

const getProductById = async (id) => {
    try {
        let detail = await Product.findByPk(id);
        if (detail) {
            return detail;
        }
        return {
            'message': 'Producto no Encontrado',
            'error': `El id: ${id} no existe`
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProductById };