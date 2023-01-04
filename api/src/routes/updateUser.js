const { Router } = require('express');
const { updateUser } = require('../controllers/updateUser');

/* Date Creation: December 12, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /user/id para otener actualizar el estado del Usuario
*/

const router = Router();

router.put('/:useremail', async (req, res) => {
    let {useremail} = req.params;
    let { rol} = req.body;
    try {
        let update = await updateUser(useremail);
        
        update.rol          = rol;
        
        await update.save()
        res.status(200).json({
            'message': 'Actualizacion de Usuario exitosa',
            'usuario': update.name,
            'Nuevo rol': update.rol,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json('Verifique la información ó Contacte al quipo de backend')
    }
})

module.exports = router;
