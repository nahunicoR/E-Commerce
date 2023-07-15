const { Router } = require('express');
const controller = require('../controllers/index');
const {response} = require('../utils')

const router = Router();

router.get('/:id', async (req, res) => {
    let { id } = req.params;
        let data = await controller.getProductById(id)
        response(res,200,data);
});

module.exports = router;