const { Router } = require('express');
const controller = require('../controllers');

const router = Router();

router.delete("/:idReview", controller.deleteReview)

module.exports = router;