
const { User, Order } = require("../db");

const getUsers = async () => {
    try {
        const usersDb = await User.findAll();
        
        return [...usersDb];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsers };