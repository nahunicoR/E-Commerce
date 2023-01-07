/* Date Creation: January 6, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /product para eliminar la imagen del producto
*/

const { Router } = require('express');
const { deleteImageProduct } = require('../controllers/deleteImageProduct');

const router = Router();

router.delete('/:id', async (req, res, next) => {
    
    let  {id}  = req.params;
    console.log(id)   
    try {
        let deleteA = await deleteImageProduct(id);
        res.json({
            'Eliminado': `${deleteA}`
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;