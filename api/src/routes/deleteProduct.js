const { Router } = require('express');
const { deleteProduct } = require('../controllers/deleteProduct');

const router = Router();

router.delete('/:id', async (req, res, next) => {
    let {id} = req.params;
    try {
        let deleteP = await deleteProduct(id);
        res.json({
            'Eliminado': `${deleteP}`
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;