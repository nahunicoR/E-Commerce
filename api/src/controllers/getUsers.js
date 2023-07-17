const { User, Order } = require("../db");
const {response} = require('../utils')

module.exports = async (req,res,next) => {
    try {
        const usersDb = await User.findAll();
        return response(res,200,[...usersDb]);  
    } catch (error) {
        next(error);
    };
};