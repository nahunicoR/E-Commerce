const { Router } = require('express');
const { updateAddressUser } = require('../controllers/updateAddressUser');

/* Date Creation: December 12, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /user/id para otener actualizar el estado del Usuario
*/

const router = Router();

router.put('/:id', async (req, res,next) => {
    let {id} = req.params;
    let { mainstreet,
        number,
        postalcode,
        street1,
        street2,
        name,
        phonenumber,
        additionals} = req.body;
    try {
        let update = await updateAddressUser(id);
        
        update.mainstreet     = mainstreet;
        update.number         = number;
        update.postalcode     = postalcode;
        update.street1        = street1;
        update.street2        = street2;
        update.name           = name;
        update.phonenumber    = phonenumber;
        update.additionals    = additionals;

        
        await update.save()
        res.status(200).json({
            'message': 'Actualizacion de Domicilio exitosa',
        });
    } catch (error) {
        console.log(error);
        next(error)
        res.status(400).json('Verifique la información ó Contacte al quipo de backend'); 
    }
})

module.exports = router;