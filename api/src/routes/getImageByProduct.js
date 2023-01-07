const { Router } = require('express');
const { getImageByProduct } = require('../controllers/getImageByProduct');
const {Image, Product} = require('../db');

/* Date Creation: January 5, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta /images para las imagenes por productos
*/
const router = Router();

router.get('/:id/images', async (req, res, next) => {
    const id = req.params.id;
    try {
      const data = await Product.findOne({
        where: { 
            id: id,
        },
        include: [{//esta llave es por si tiene más relaciones, puede quitarse si sólo es una relación como en este caso
            model: Image,
            as: "imageproduct",
            atributes:["url", "folder"]
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