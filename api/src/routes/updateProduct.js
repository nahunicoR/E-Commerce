const { Router } = require('express');
const { updateProduct } = require('../controllers/updateProduct');


const router = Router();

router.put('/:id', async (req, res) => {
    let {id} = req.params;
    let { name, price, stock, image } = req.body;
    try {
        let update = await updateProduct(id);
        update.name = name;
        update.price = price;
        update.stock = stock;
        update.image = image;
        console.log(update)
        await update.save()
        res.send('Producto Actualizado');
    } catch (error) {
        console.log(error);
        res.json('Contacte al quipo de backend')
    }
})

module.exports = router;