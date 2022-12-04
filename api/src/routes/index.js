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
            'Peticion /POST': '/product',
            'id': 'INTEGER, Se crea automaticamente',
            'title': 'STRING, nombre o titulo del producto',
            'price': 'FLOAT, precio del producto',
            'category': 'STRING, categoria',
            'description': 'STRING, se puede cambiar a TEXT depende del front',
            'image': 'STRING, url de una imagen',
        },
        {
            'Peticion /GET': '/products, obtenemos todos los registros de la DB',
        },
        {
            'Peticion /DELETE': '/product/:id, borramos un registro pasando su id, va a ser modificado mas adelante aplicando borrado logico',
        },
        {
            'Peticion /GET': '/product/:id, trae un registro por su id'
        },
        {
            'Peticion /PUT': '/product/:id, actualiza un registro por medio de su id'
        }
    ])
});

module.exports = router;
