const { Router } = require('express');
const controller = require('../controllers');

const router = Router();

router.get('/:status/products', controller.getOrderStatus);

module.exports = router;