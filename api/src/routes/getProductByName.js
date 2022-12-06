const { Router } = require('express');
const { getProductsDb } = require('../controllers/getProductsDb')

const router = Router();

router.get('/', async (req, res) => {
    let { title } = req.query; 
    console.log(title)
    let allProducts = await getProductsDb();
    
    if (title) {
        try {
            const ProductByName = allProducts.filter(product => product.title.toLowerCase().includes(title.toLowerCase()));
            console.log(ProductByName.length)
            ProductByName.length > 0 
                ?
            res.status(200).json(ProductByName)
                :
            res.status(404).json({
                'message': `Producto: ${title} no encontrado`,
                'error': '404 Product no Found'
            })
        } catch (error) {
            res.json({
                'message': `${error}`,
                'error': 'Comuniquense con el equipo de Backend'
            })    
        }
    }
})

module.exports = router;