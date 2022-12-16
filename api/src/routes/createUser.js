const { Router } = require('express');
const { User } = require('../db');
const router = Router();

function validatorCreateUser(req,res,next){
    const { name, lastName, email } = req.body;

    if(
        typeof name !== "string" ||
        typeof lastName !== "string" ||
        typeof email !== "string" ||
        name == "" ||
        lastName == "" ||
        email == ""
    ) {
        return res.json({
            error: "bad request"
        })
    }
    next();
    
}

router.post('/', validatorCreateUser, async (req, res, next) => {
    try {
        const { name, lastName, email, password } = req.body;
     
        const formatEmail = email.toLowerCase();

        const [user, created] = await User.findOrCreate({
            where:{
                name,
                lastName, 
                email: formatEmail,
                password   
            }
        })
        !created ? res.status(400).json('El usuario ya existe') : res.status(200).json(user);

    } catch (error) {
        next(error);
        res.status(400).json(error.message)
    }
});

module.exports = router;