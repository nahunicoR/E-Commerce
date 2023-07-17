const { User } = require("../db");
const {response} = require("../utils");
// const bcrypt = require('bcrypt');

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

module.exports = /*validatorCreateUser, */ async (req, res, next) => {
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
        created ? response(res,200,user) : response(res,200,user);
    } catch (error) {
        next(error);
    };
};