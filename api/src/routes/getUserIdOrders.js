const { Router } = require('express');
const controller = require('../controllers');
const router = Router();

router.get('/:iduser/ordenes', controller.getUserIdOrders);

module.exports = router;