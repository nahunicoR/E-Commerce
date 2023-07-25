const { Router } = require("express");
const controller = require("../controllers");
// const bcrypt = require('bcrypt');
const { validateCreate } = require("../validators/validatorCreateUser");
const router = Router();

router.post("/", validateCreate, controller.createUser);

module.exports = router;
