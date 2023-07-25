const { Router } = require('express');
const controller = require('../controllers');
const router = Router();

router.put('/', controller.packOffOrder);

module.exports = router;