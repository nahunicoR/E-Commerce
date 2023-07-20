const { Router } = require('express');
const controller = require('../controllers/index');

const router = Router();

router.get('/:id', controller.getProductById);

module.exports = router;