const { Router } = require("express");
const { User } = require("../db");

/* Date Creation: December 12, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /users/all para otener todos los usuarios
*/
const router = Router();

const getUser = async (email) => {
	try {
		const userDb = await User.findOne({ where: { email: email } });

		return userDb;
	} catch (error) {
		console.log(error);
	}
};

router.get("/one", async (req, res, next) => {
	const { mail } = req.query;
	try {
		const data = await getUser(mail);
		return res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
