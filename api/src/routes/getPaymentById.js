const express = require('express');
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.getPaymentById);

module.exports = router;