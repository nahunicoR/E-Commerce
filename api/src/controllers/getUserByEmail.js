const {response} = require("../utils");  
const { User } = require("../db");

module.exports = async (req, res, next) => {
	const { mail } = req.query;
	try {
        const userDb = await User.findOne({ where: { email: mail } });
		return response(res,200,userDb);
	} catch (error) {
		next(error);
	};
};