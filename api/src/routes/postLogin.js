const { Router } = require("express");
const controller = require("../controllers");
const { validateLogin } = require("../validators/validatorLogin");
const router = Router();

router.post("/", validateLogin, controller.loginUser);

module.exports = router;