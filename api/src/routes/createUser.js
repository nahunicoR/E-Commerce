const { Router } = require('express');
const { Users } = require('../db');
const router = Router();

router.post('/', async (req, res, next) => {
    try {
        let { name } = req.body;
        console.log(name)
        let newUser = await Users.create({
            name,
        })
        res.status(200).json(newUser);
    } catch (error) {
        next(error)
    }

})

module.exports = router;