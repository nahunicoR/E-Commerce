const { Router } = require('express');
const { getProductById } = require('../controllers/getProductById');

const router = Router();

router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    try {
        let data = await getProductById(id)
        if (data.length === 0) {
            return res.json('No se encontro id');
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
});

module.exports = router;