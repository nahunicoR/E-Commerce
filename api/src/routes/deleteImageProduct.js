const { Router } = require('express');
const controller = require('../controllers');
const router = Router();

router.delete('/:id', controller.deleteImageProducts);

module.exports = router;