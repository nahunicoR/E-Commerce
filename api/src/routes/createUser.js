const { Router } = require("express");
const { User } = require("../db");
// const bcrypt = require('bcrypt');
const router = Router();

// function validatorCreateUser(req,res,next){
//     const { name, lastName, email } = req.body;

//     if(
//         typeof name !== "string" ||
//         typeof lastName !== "string" ||
//         typeof email !== "string" ||
//         name == "" ||
//         lastName == "" ||
//         email == ""
//     ) {
//         return res.json({
//             error: "bad request"
//         })
//     }
//     next();

// }

router.post(
	"/",
	/*validatorCreateUser, */ async (req, res, next) => {
		const { name, /*family_name, */ email } = req.body; //password
		// console.log(family_name, email)
		try {
			//let hashedPassword = await bcrypt.hash(password, 10);

			// const formatEmail = email.toLowerCase();

			const [user, created] = await User.findOrCreate({
				where: {
					email,
					// family_name,
					name: name,
					rol: email === "pruebadeveloper.tomate@gmail.com" ? "admin" : "user",
					//password: hashedPassword
				},
			});
			created ? res.status(200).json(user) : res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
