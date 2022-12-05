const { Router } = require('express');
const { Product } = require('../db');
const router = Router();

router.post('/', async (req, res, next) => {
    const { title, price, category, description, image } = req.body;
    try {
        if(!title) return res.status(400).json('No se ingreso titulo');
        if(!price) return res.status(400).json('No se ingreso precio');
        if(!category) return res.status(400).json('No se ingreso categoria');
        if(!description) return res.status(400).json('No se ingreso descripcion');
        if(!image) return res.status(400).json('No se ingreso imagen');

        const newProduct = {
            title,
            price,
            category,
            description,
            image
        }
       const [product, created] = await Product.findOrCreate({
            where: {
                title,
                price,
                category,
                description,
                image
            },
            defaults: newProduct
        });
        if(!created) return res.status(400).json('El producto ya existe');
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
});

module.exports = router;