const express = require('express');
const router = express.Router();
const controller = require("../controllers");

router.post('/notification', controller.paymentNotification);

module.exports = router;