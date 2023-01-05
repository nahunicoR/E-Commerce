const { Router } = require('express');
const { Address } = require('../db');
const router = Router();

/* Date Creation: December 19, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea el servicio de la ruta /address para crear el domicilio de cada usuario
*/
router.post('/', async (req, res, next) => {
    const { mainstreet, number, postalcode, street1, street2, name, phonenumber, additionals, userEmail } = req.body;
    try {
      
        let newAddress = await Address.create({
            mainstreet,
            number,
            postalcode,
            street1,
            street2,
            name,
            phonenumber,
            additionals,
            userEmail
        });
        res.status(200).json({
            "Id street" : newAddress.id, 
            "Id user" : newAddress.userId
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'message': "El status no es correcto",
            'error': 'Error en status, debe ser status = creada'
        })
    }
});

module.exports = router;