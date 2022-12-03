const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createProduct = require('./createProduct');
const getProductsDb = require('./getProducts');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product', createProduct);
router.use('/products', getProductsDb);


router.get('/', async (req,res,next) => {
res.json({
    'ruta /post': '/product',
    'name': '',
    'price': '',
    'image': 'por ahora aca se puede poner una url de una imagen',
    'ruta /get': '/products',
})
});

module.exports = router;
