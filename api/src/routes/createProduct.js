const { Router } = require('express');
const { Product } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    try {
        let { name, price, stock, image } = req.body;
        let newProduct = await Product.create({
            name,
            price,
            stock,
            image
        })
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error)
        res.send('Faltan Datos')
    }

})

module.exports = router;