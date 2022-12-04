const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createProduct = require('./createProduct');
const getProductsDb = require('./getProducts');
const deleteProduct = require('./deleteProduct');
const getProductById = require('./getProductById');
const updateProduct = require('./updateProduct');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product'       , createProduct);
router.use('/products'      , getProductsDb);
router.use('/product'       , deleteProduct);
router.use('/product'       , getProductById);
router.use('/product'       , updateProduct);


router.get('/', async (req,res,next) => {
    res.json([
        {
            'ruta /GET': '/products',
            'name': '',
            'price': '',
            'image': 'por ahora aca se puede poner una url de una imagen',
            'ruta /get': '/products',
        },
        {
            'ruta /POST':'/product'
        },
        {
            'ruta /DELETE': '/product/:id',
        }
    ])
});

module.exports = router;
