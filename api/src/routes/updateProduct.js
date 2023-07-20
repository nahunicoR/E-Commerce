const { Router } = require('express');
const controller = require('../controllers');


const router = Router();

router.put('/:id', controller.updateProduct)

module.exports = router;