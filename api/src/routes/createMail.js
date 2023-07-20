const { Router } = require('express');
const  nodemailer = require('nodemailer');
const controller = require("../controllers");

const router = Router();

router.post('/mail', controller.createMail);

module.exports = router;