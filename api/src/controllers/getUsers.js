
const { User, Order } = require("../db");

/* Date Creation: December 12, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /users/all para otener todos los usuarios
*/
const getUsers = async () => {
    try {
        const usersDb = await User.findAll();
        
        return [...usersDb];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsers };