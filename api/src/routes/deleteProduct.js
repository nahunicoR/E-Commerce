const { Router } = require('express');
const { deleteProduct } = require('../controllers/deleteProduct');

const router = Router();

router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try {
        let deleteP = await deleteProduct(id)
        console.log(deleteP)
        res.send('Producto eliminado');
    } catch (error) {
        
    }
})

module.exports = router;