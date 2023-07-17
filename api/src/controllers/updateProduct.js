const { Product } = require("../db");
const {response} = require("../utils");

module.exports = async (req,res,next) => {
    const {id} = req.params;
    const { title, price, category, description, image, material, stock} = req.body;
    try {
        let update = await Product.findByPk(id);
        update.title        = title;
        update.price        = price;
        update.category     = category;
        update.description  = description;
        update.image        = image;
        update.material     = material;
        update.stock        = stock;
        console.log(update)
        await update.save()
        response(res,200,{
            message: 'Actualizacion de Producto exitosa',
        });
    } catch (error) {
        next(error);
    };
};