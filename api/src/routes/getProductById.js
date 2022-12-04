const { Router } = require('express');
const { getProductById } = require('../controllers/getProductById');

const router = Router();

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let data = await getProductById(id)
        if (data.length === 0) {
            return res.json('No se encontro id');
        }
        res.json(data)
    } catch (error) {
        console.log(error)
        res.send('contacte al Grupo del back')
    }
})

module.exports = router;