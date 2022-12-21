const { Router } = require('express');
const { Op } = require('sequelize');
const { Product } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
    const { title } = req.query; 

    if (title) {
        try {
            const ProductName = await Product.findAll({
                where: {
                    title: {
                        [Op.iLike] : `%${title}%`
                    }
                }
            });
            ProductName.length > 0 ? res.status(200).json(ProductName) : res.status(404).json({
                'message': `Producto: ${title} no encontrado`,
                'error' : '404 Product Not Found'
            }); 
        } catch (error) {
            next(error)
            res.json({
                'message': `${error}`,
                'error': 'Comuniquense con el equipo de Backend'
            })    
        }
    }
})

module.exports = router;