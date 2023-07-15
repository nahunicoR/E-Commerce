const { Product } = require("../db");

module.exports = async () => {
    const ProductosDb = await Product.findAll();
    let resp = await ProductosDb.map( product => {
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
    return resp;
};