const { Router } = require('express');
const router = Router();
const { getProductById } = require('../controllers/getProductById');

router.get('/:id', async (req, res) =>{
    try {
        const { id } = req.params;

        const getProId = await getProductById(id);

        getProId ? res.json(getProId) : res.status(404).json({error: 'id invalid'});

    } catch (error) {
        res.send({error: error.message})
    }
})

module.exports = router;