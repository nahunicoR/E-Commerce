const { Router } = require('express');
const router = Router();
const controller = require("../controllers");

router.post('/', controller.createDetailOrder);

module.exports = router;