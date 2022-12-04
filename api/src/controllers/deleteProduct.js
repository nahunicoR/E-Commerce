const { Product } = require("../db");

const deleteProduct = async (id) => {
    try {
        let detail = await Product.destroy({
            where: {
                id
            }
        })
        console.log(detail)
        return 'Producto eliminado'
    } catch (error) {
        console.log(error)
    }
}

module.exports = { deleteProduct }