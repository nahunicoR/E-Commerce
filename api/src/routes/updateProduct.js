const { Router } = require('express');
const { updateProduct } = require('../controllers/updateProduct');


const router = Router();

router.put('/:id', async (req, res) => {
    let {id} = req.params;
    let { title, price, category, description, image } = req.body;
    try {
        let update = await updateProduct(id);
        update.title        = title;
        update.price        = price;
        update.category     = category;
        update.description  = description;
        update.image        = image;
        console.log(update)
        await update.save()
        res.send('Producto Actualizado');
    } catch (error) {
        console.log(error);
        res.json('Contacte al quipo de backend')
    }
})

module.exports = router;