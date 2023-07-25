const { Router } = require('express');
const controller = require('../controllers');

const router = Router();

router.delete('/', controller.deleteAddressUser);

module.exports = router;