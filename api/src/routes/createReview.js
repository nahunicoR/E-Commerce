const { Router } = require('express');
const controller = require('../controllers');
const { checkSessionUser } = require('../middlewares/checkUser');
const router = Router();

router.post('/:id/reviews', checkSessionUser, controller.createReview);

module.exports = router;
