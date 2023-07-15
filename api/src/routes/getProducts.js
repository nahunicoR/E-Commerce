const { Router } = require('express');
const {Product} = require('../db');
const products = require('../controllers/objProducts');
const controller = require("../controllers")
const {response} = require('../utils');


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await controller.getProductsDb();
        if (!data.length) {
            const load = await Product.bulkCreate(products);
            return response(res,200,load);
        }
        return response(res,200,data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;