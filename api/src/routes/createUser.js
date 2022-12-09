const { Router } = require('express');
const { User } = require('../db');
const router = Router();


router.post('/', async (req, res, next) => {
    try {
        let { name, lastName, email, password } = req.body;
        let newUser = await User.create({
            name,
            lastName,
            email,
            password
        })
        res.status(200).json(newUser);
    } catch (error) {
        next(error)
    }
});

module.exports = router;