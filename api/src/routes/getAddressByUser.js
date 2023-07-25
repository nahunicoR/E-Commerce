const { Router } = require('express');
const controller = require('../controllers');

const router = Router();

router.get('/:email/streets', controller.getAddressByUser);

module.exports = router;