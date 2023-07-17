const { Product } = require("../db");
const {response} = require("../utils");

module.exports = async (req,res,next) => {
    const {id} = req.params;
    try {
        let detail = await Product.destroy({
            where: { id }
        });
        return response(res,200,`Se elimino el producto con id: ${detail}`);
    } catch (error) {
        next(error);
    };
};
