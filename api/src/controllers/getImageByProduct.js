/* Date Creation: January 05, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio obtener los productos y sus imágenes
*/

const { Image, Product } = require("../db");

const getImageByProduct = async (req, res, next) => {
    const id = req.params
    try {
        const imageDb = await Product.findByPk(id);
        if (imageDb) {
            Image.getImageproduct();
        }
        return res.json(imageDb);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getImageByProduct };