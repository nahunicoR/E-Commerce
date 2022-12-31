const { Router } = require('express');
const { updateProduct } = require('../controllers/updateProduct');


const router = Router();

router.put('/:id', async (req, res) => {
    let {id} = req.params;
    let { title, price, category, description, image, material, stock} = req.body;
    try {
        let update = await updateProduct(id);
        update.title        = title;
        update.price        = price;
        update.category     = category;
        update.description  = description;
        update.image        = image;
        update.material     = material;
        update.stock        = stock;
        console.log(update)
        await update.save()
        res.status(200).json({
            'message': 'Actualizacion de Producto exitosa',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json('Verifique la categoria ó Contacte al quipo de backend')
    }
})

module.exports = router;