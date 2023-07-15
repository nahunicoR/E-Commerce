const { User, Order } = require("../db");

module.exports = async () => {
    const usersDb = await User.findAll();
    return [...usersDb];
};