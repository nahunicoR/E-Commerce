const { Product } = require("../db");

const getProductsDb = async () => {
    try {
        const ProductosDb = await Product.findAll();
        let resp = await ProductosDb?.map( product => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                category: product.category,
                description: product.description,
                image: product.image
            }
        })
        return resp;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProductsDb };