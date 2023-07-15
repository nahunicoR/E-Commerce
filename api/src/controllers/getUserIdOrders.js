/* Date Creation: December 13, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /users/?id/orders para otener todos los usuarios y sus ordenes
*/

const {User} = require("../db");

module.exports = async (req, res) => {
    const id = req.params.id;
        const userDb = await User.findByPk(id);
        if (userDb) {
            User.getOrdenes();
        }
        return res.json(userDb);
};