const { Product } = require("../db");

const updateProduct = async (id) => {
    try {
        let detail = await Product.findByPk(id);
        console.log(detail);
        return detail;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { updateProduct };