const { Router } = require("express");
const controller = require("../controllers");
// const bcrypt = require('bcrypt');
const router = Router();

router.post("/",/*validatorCreateUser, */ controller.createUser);

module.exports = router;
