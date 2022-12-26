/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /address/id para eliminar el domicilio del Usuario
*/

const { Router } = require('express');
const { deleteAddressUser } = require('../controllers/deleteAddressUser');

const router = Router();

router.delete('/', async (req, res, next) => {
    
    let { id } = req.query;
    let { userId } = req.query
    
    try {
        let deleteA = await deleteAddressUser(id,userId);
        res.json({
            'Eliminado': `${deleteA}`
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;