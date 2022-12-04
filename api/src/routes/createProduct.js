const { Router } = require('express');
const { Product } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    try {
        let { title, price, category, description, image } = req.body;
        let newProduct = await Product.create({
            title,
            price,
            category,
            description,
            image
        })
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error)
        res.send('Agregar una categoria Correcta')
    }

})

module.exports = router;