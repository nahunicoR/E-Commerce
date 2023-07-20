const { Router } = require('express');
const controller = require('../controllers');

const router = Router();

router.delete('/:id', controller.deleteProduct);

module.exports = router;