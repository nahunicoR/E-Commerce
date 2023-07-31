const { Router } = require('express');
const controller = require('../controllers');
const { checkAdminAuth } = require('../middlewares/checkAdmin');
const router = Router();

router.get('/all', checkAdminAuth, controller.getUsers);

module.exports = router;