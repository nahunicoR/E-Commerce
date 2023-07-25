const { Router } = require('express');
const controller = require('../controllers')

const router = Router();

router.get('/:userEmail/orders', controller.getOrderByUser);

module.exports = router;