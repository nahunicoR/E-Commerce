const { Router } = require('express');
const { getProductById } = require('../controllers/getProductById');

const router = Router();

router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    try {
        let data = await getProductById(id)
        if (data.id) {
            return res.status(200).json(data);
        }
        res.status(404).json(data)
    } catch (error) {
        next(error)
    }
});

module.exports = router;