const { Product } = require("../db");

module.exports = async (id) => {
    let detail = await Product.findByPk(id);
        if (detail) {
            return detail;
        }
        return {
            message: 'Producto no Encontrado',
            error: `El id: ${id} no existe`
        };
};