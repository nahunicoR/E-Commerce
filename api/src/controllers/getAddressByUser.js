/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /addresses/?id/streets para otener todos los usuarios y sus domicilios
*/

const { User, Address } = require("../db");

const getUserAddressByUser = async (req, res, next) => {
    const email = req.params
    try {
        const userDb = await User.findByPk(email);
        if (userDb) {
            User.getStreets();
        }
        return res.json(userDb);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserAddressByUser };