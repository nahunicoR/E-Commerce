const { Router } = require("express");
const controller = require("../controllers");
const router = Router();

router.get("/one", controller.getUserByEmail);

module.exports = router;
