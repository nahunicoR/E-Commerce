const { Router } = require('express');
const { Product } = require('../db');
const router = Router();

router.post('/', async (req, res) => {

        try {
        let { nameProduct, normalPrice } = req.body;
                
        let newProduct = await Product.create({ // falta cambiar el create por el findOrCreate
            nameProduct,
            normalPrice,
            // falta agregar todas las variables
        })
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error)
        res.send('Faltan Datos')
    }
})

module.exports = router;