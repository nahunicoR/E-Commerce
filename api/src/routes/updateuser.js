const { Router } = require('express');
const { updateUser } = require('../controllers/updateUser');


const router = Router();

router.put('/:id', async (req, res) => {
    let {id} = req.params;
    let { rol} = req.body;
    try {
        let update = await updateUser(id);
        
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