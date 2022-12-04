const {Product} = require("../db");

const getProductById = async (id) => {
   try {
        const find = await Product.findById(id);
        return find;
   } catch (error) {
    console.log(error);
   }
 
}

module.exports = { getProductById };