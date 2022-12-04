const { Product } = require("../db");

const getProductsDb = async () => {
    try {
        const ProductosDb = await Product.findAll();
        let resp = await ProductosDb?.map( product => {
            return {
                id: product.id,
                name: product.name,
                stock: product.price,
                image: product.image
            }
        })
        return resp;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProductsDb };