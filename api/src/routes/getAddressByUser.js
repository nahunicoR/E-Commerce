const { Router } = require('express');
const { getAddressByUser } = require('../controllers/getAddressByUser');
const {User, Address} = require('../db');

/* Date Creation: December 20, 2022
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /addresses/:id/streets para otener todas los domicilios del usuario
*/
const router = Router();

router.get('/:email/streets', async (req, res, next) => {
    const email = req.params.email;
    try {
      const data = await User.findOne({
        where: { 
            email: email,
        },
        include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
            model: Address,
            as: "streets",
            atributes:["mainstreet", "number","postalcode",
                        "street1", "street2", "name", "phonenumber",
                        "additonals"]
        }]
        
      }); 
      if (data) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({message:"No se encontró usuario"});
      }  
      
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
});

module.exports = router;