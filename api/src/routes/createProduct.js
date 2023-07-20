const { Router } = require("express");
const controller = require("../controllers");

const router = Router();

router.post("/", controller.createProduct);

module.exports = router;
