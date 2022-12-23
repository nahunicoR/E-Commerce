const { Router } = require('express');
const { getProductsDb } = require('../controllers/getProductsDb');
const {Product} = require('../db');
const products = require('../controllers/objProducts');


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await getProductsDb();
        if (!data.length) {
            const load = await Product.bulkCreate(products);
            return res.json(load);
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;