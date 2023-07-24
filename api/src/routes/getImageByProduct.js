const { Router } = require('express');
const controller = require('../controllers');

const router = Router();

router.get('/:id/images', controller.getImageByProduct);

module.exports = router;