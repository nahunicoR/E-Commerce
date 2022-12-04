const { Router } = require('express');
const { User } = require('../db');
const router = Router();


router.post('/user', async (req, res, next) => {
    try {
        let { name } = req.body;
        let newUser = await User.create({
            name
        })
        res.status(200).json(newUser);
    } catch (error) {
        next(error)
    }
});

module.exports = router;