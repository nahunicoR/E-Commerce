const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createProduct = require('./createProduct');
const getProductsDb = require('./getProducts');
const deleteProduct = require('./deleteProduct');
const getProductById = require('./getProductById');
const updateProduct = require('./updateProduct');
const getProductByName = require('./getProductByName');
const createUser = require('./createUser');   

//Para usuarios

const getUsersDb = require('./getUsers');
const getOrdersUsers = require('./getOrdersUsers');
const getUserIdOrders = require('./getUserIdOrders');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product'       , createProduct);
router.use('/products'      , getProductsDb);
router.use('/product'       , deleteProduct);
router.use('/product'       , getProductById);
router.use('/product'       , updateProduct);
router.use('/product'       , getProductByName);
router.use('/user'          , createUser);

//Para usuarios

router.use('/users', getUsersDb)
router.use('/users', getOrdersUsers)
router.use('/users', getUserIdOrders)

router.get('/', async (req,res,next) => {
    res.json([
        {
            'Peticion /POST': '/product',
            'id': 'INTEGER, Se crea automaticamente',
            'title': 'STRING, nombre o titulo del producto',
            'price': 'FLOAT, precio del producto',
            'category': 'ENUN, categoria si no agregan una categoria correcta no se crea.. "Bombilla", "Yerba","Mate","Kit"',
            'description': 'STRING, se puede cambiar a TEXT depende del front',
            'image': 'STRING, url de una imagen',
        },
        {
            'Peticion /GET': '/products, obtenemos todos los registros de la DB',
        },
        {
            'Peticion /DELETE': '/product/:id, borramos un registro pasando su id, va a ser modificado mas adelante aplicando borrado logico, Alguien lo sugirio escucho sugerencias',
        },
        {
            'Peticion /GET': '/product/:id, trae un registro por su id'
        },
        {
            'Peticion /PUT': '/product/:id, actualiza un registro por medio de su id asegurarse que la categoria sea correcta'
        },
        {
            'Peticion /GET': '/product?title="Nombre a buscar"'
        },
        {
            'Peticion /POST': '/user, Creacion de usuario',
            'name': 'por ahora solo name'
        },

        {
            '*************** USERS ': '*********************** ',
            'Peticion /GET': '/users/all, para obtener todos los usuarios de la base de datos',
        },
        {
            'Peticion /GET': '/users/orders, para obtener todos los usuarios y sus ordenes de la base de datos',
        },
        {
            'Peticion /GET': '/users/id/ordenes, para obtener un usario y sus ordenes de la base de datos',
            'id': 'id del usuario'
        }
    ])
});

module.exports = router;
