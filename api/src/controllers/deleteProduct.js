const { Product } = require("../db");

const deleteProduct = async (id) => {
    try {
        let detail = await Product.destroy({
            where: {
                id
            }
        })
        return `Se elimino el producto con id: ${detail}`;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteProduct };