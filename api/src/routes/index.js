const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createProduct = require('./createProduct');
const getProductsDb = require('./getProducts');
const deleteProduct = require('./deleteProduct');
const getProductById = require('./getProductById');
const updateProduct = require('./updateProduct');
const getProductByName = require('./getProductByName');
   

/* Para usuarios 
   Author: Alejandro Téllez
*/

const getUsersDb = require('./getUsers');
const getOrdersUsers = require('./getOrdersUsers');
const getUserIdOrders = require('./getUserIdOrders');
const createUser = require('./createUser');               // Creado por Jesús Delgado
const updateUser = require('./updateUser');               // Creado por Jesús Delgado

/* Para ordenes 
   Author: Alejandro Téllez
*/

const createOrder = require('./createOrder');
const createDetailorder = require('./createDetailorder');


/* Para Address 
   Author: Alejandro Téllez
*/

const createAdress = require('./createAddress');
const getAddressByUser = require('./getAddressByUser');
const updateAddressUser = require('./updateAddressUser');
const deleteAddressUser = require('./deleteAddressUser');

/* Para Emails 
   Author: Alejandro Téllez
*/

const createMail = require('./createMail');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product'       , createProduct);
router.use('/products'      , getProductsDb);
router.use('/product'       , deleteProduct);
router.use('/product'       , getProductById);
router.use('/product'       , updateProduct);
router.use('/product'       , getProductByName);


/* Para usuarios 
   Author: Alejandro Téllez 
*/

router.use('/users', getUsersDb)
router.use('/users', getOrdersUsers)
router.use('/users', getUserIdOrders)
router.use('/user',  createUser);      //Creado por Jesús Delgado
router.use('/user',  updateUser);

/* Para Ordenes 
   Author: Alejandro Téllez 
*/

router.use('/order',  createOrder);
router.use('/detailorder',  createDetailorder);


/* Para Address 
   Author: Alejandro Téllez 
*/

router.use('/address',  createAdress);
router.use('/addresses', getAddressByUser);
router.use('/address', updateAddressUser);
router.use('/address', deleteAddressUser);

/* Para Mails 
   Author: Alejandro Téllez 
*/

router.use('/',  createMail);

/* Para Mercado Pago
    Autho: Nahuel Riveros
*/
const mercadoPago = require('./mercadopago');

router.use('/payment', mercadoPago);



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
            '*************** USERS ': '*********************** ',
            'Peticion /GET': '/users/all, para obtener todos los usuarios de la base de datos',
        },
        {
            'Peticion /GET': '/users/orders, para obtener todos los usuarios y sus ordenes de la base de datos',
        },
        {
            'Peticion /GET': '/users/id/ordenes, para obtener un usario y sus ordenes de la base de datos',
            'id': 'id del usuario'
        },
        {
            'Peticion /POST': '/user, Creación de usuario     Jesús Delgado',   
            'name, rol, email': 'Todos las propiedades'
        },
        {
            'Peticion /PUT': '/user, Modificación de usuario',   
            'rol': 'si el ROL se guarda como denegado, el usuario ya no podrá usar la plataforma'
        },
        {
            '*************** ORDERS ': '*********************** ',
            'Peticion /POST': '/order, para crear la orden en la base de datos',
        },
        {
            'Peticion /POST': '/detailorder, para crear el detalle de la orden en la base de datos',
        },


        {
            '*************** ADDRESS ': '*********************** ',
            'Peticion /POST': '/address, para crear la orden en la base de datos',
        },

        {
            'Peticion /GET': '/addresses/id/streets, para obtener los domicilios del usuario',
        },
        {
            'Peticion /PUT': '/address/id, para modificar el domicilio del usuario',
        },
        {
            'Peticion /DELETE': 'address/?id=xx&userId=xx, debe ser por query para eliminar el domicilio del usuario',
        },
        {
            '*************** MAIL ': '*********************** ',
            'Peticion /POST': '/mail, para crear el correo y enviarlo',
        },



    ])
});

module.exports = router;
