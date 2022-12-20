const { Router } = require('express');
const { User } = require('../db');
const router = Router();


router.post('/', async (req, res, next) => {
    try {
        let { name, rol, email } = req.body;
        let newUser = await User.create({
            name,
            rol,
            email
        })
        res.status(200).json(newUser);
    } catch (error) {
        next(error)
    }
});

module.exports = router;