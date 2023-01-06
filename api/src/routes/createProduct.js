const { Router } = require('express');
const { Product } = require('../db');
const router = Router();

router.post('/', async (req, res, next) => {
    const { title, price, category, description, image, material, stock } = req.body;
    try {
        if(!title) return res.status(400).json('No se ingreso titulo');
        if(!price) return res.status(400).json('No se ingreso precio');
        if(!category) return res.status(400).json('No se ingreso categoria');
        if(!description) return res.status(400).json('No se ingreso descripcion');
        if(!material) return res.status(400).json('No se ingreso material');
        if(!stock) return res.status(400).json('No se ingreso stock');
        const newProduct = {
            title,
            price,
            category,
            description,
            material,
            stock
        }
       const [product, created] = await Product.findOrCreate({
            where: {
                title,
                price,
                category,
                description,
                material,
                stock
            },
            defaults: newProduct
        });
        if(!created) return res.status(400).json('El producto ya existe');
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'message': "Las categorias validas son 'Bombilla','Mate','Kit','Yerba'",
            'error': 'Error en categoria'
        })
    }
});

module.exports = router;