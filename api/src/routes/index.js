const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createProduct = require("./createProduct");
const getProductsDb = require("./getProducts");
const deleteProduct = require("./deleteProduct");
const getProductById = require("./getProductById");
const updateProduct = require("./updateProduct");
const getProductByName = require("./getProductByName");
const getImageByProduct = require("./getImageByProduct");
const deleteImageProduct = require("./deleteImageProduct");

const getAllReviewByProduct = require("./getAllReview");
const createReview = require("./createReview");
const updateReview = require("./updateReview");
const deleteReview = require("./deleteReview");
const getUser = require("./getUserbyEmail");

const login = require("../middlewares/login.js");
const admin = require("../middlewares/admin");

/* Para usuarios 
   Author: Alejandro Téllez
*/

const getUsersDb = require("./getUsers");
const getUserIdOrders = require("./getUserIdOrders");
const createUser = require("./createUser"); // Creado por Jesús Delgado
const updateUser = require("./updateUser"); // Creado por Jesús Delgado

/* Para ordenes 
   Author: Alejandro Téllez
*/

const createOrder = require("./createOrder");
const createDetailorder = require("./createDetailorder");
const packOffOrder = require("./packOffOrder");
const getOrdersUsers = require("./getOrdersUsers");
const getOrderByUser = require("./getOrderByUser");
const getOrderStatus = require("./getOrderStatus");

/* Para Address 
   Author: Alejandro Téllez
*/

const createAdress = require("./createAddress");
const getAddressByUser = require("./getAddressByUser");
const updateAddressUser = require("./updateAddressUser");
const deleteAddressUser = require("./deleteAddressUser");

/* Para Emails 
   Author: Alejandro Téllez
*/

const createMail = require("./createMail");

/* Para cloudinary 
    Author: Alejandro Téllez
*/

const uploadImage = require("./uploadImage");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/product", createProduct);
router.use("/products", getProductsDb);
router.use("/product", deleteProduct);
router.use("/product", getProductById);
router.use("/product", updateProduct);
router.use("/product", getProductByName);
router.use("/product", getImageByProduct);
router.use("/image", deleteImageProduct);

/**Para Reviews */

router.use("/review", createReview);
router.use("/reviews", getAllReviewByProduct);
router.use("/review", updateReview);
router.use("/review", deleteReview);

// router.use('/reviews'        , getAllReviewByProduct); para pruebas con bulkCreate

/* Para usuarios 
   Author: Alejandro Téllez 
*/

router.use("/users", getUsersDb);
router.use("/users", getUserIdOrders);
router.use("/user", createUser); //Creado por Jesús Delgado
router.use("/user", updateUser);
router.use("/user", getUser);

/* Para Ordenes 
   Author: Alejandro Téllez 
*/

router.use("/order", createOrder);
router.use("/detailorder", createDetailorder);
router.use("/order", packOffOrder);
router.use("/orders", getOrdersUsers);
router.use("/order", getOrderByUser);
router.use("/order", getOrderStatus);

/* Para Address 
   Author: Alejandro Téllez 
*/

router.use("/address", createAdress);
router.use("/addresses", getAddressByUser);
router.use("/address", updateAddressUser);
router.use("/address", deleteAddressUser);

/* Para Mails 
   Author: Alejandro Téllez 
*/

router.use("/", createMail);

/* Para Cloudinary  
   Author: Alejandro Téllez 
*/

router.use("/", uploadImage);
/* Para Mercado Pago
    Author: Nahuel Riveros
*/

const mercadoPago = require("./mercadopago");

router.use("/", mercadoPago);

// const review = require("./createReview");
// router.use("/reviews", review)

/**Authorization */
router.get("/authorization", login, admin, (req, res) => {
	try {
		res.status(200).send({ authorized: true });
	} catch (error) {
		res.send({ authorized: false });
	}
});

router.get("/", async (req, res, next) => {
	res.json([
		{
			"Peticion /POST": "/product",
			id: "INTEGER, Se crea automaticamente",
			title: "STRING, nombre o titulo del producto",
			price: "FLOAT, precio del producto",
			category:
				'ENUN, categoria si no agregan una categoria correcta no se crea.. "Bombilla", "Yerba","Mate","Kit"',
			description: "STRING, se puede cambiar a TEXT depende del front",
			image: "STRING, url de una imagen",
		},
		{
			"Peticion /GET": "/products, obtenemos todos los registros de la DB",
		},
		{
			"Peticion /DELETE":
				"/product/:id, borramos un registro pasando su id, va a ser modificado mas adelante aplicando borrado logico, Alguien lo sugirio escucho sugerencias",
		},
		{
			"Peticion /GET": "/product/:id, trae un registro por su id",
		},
		{
			"Peticion /PUT":
				"/product/:id, actualiza un registro por medio de su id asegurarse que la categoria sea correcta",
		},
		{
			"Peticion /GET": '/product?title="Nombre a buscar"',
		},
		{
			"*************** USERS ": "*********************** ",
			"Peticion /GET":
				"/users/all, para obtener todos los usuarios de la base de datos",
		},
		{
			"Peticion /GET":
				"/users/id/ordenes, para obtener un usario y sus ordenes de la base de datos",
			id: "id del usuario",
		},
		{
			"Peticion /POST": "/user, Creación de usuario     Jesús Delgado",
			"name, rol, email": "Todos las propiedades",
		},
		{
			"Peticion /PUT": "/user, Modificación de usuario",
			rol: "si el ROL se guarda como denegado, el usuario ya no podrá usar la plataforma",
		},
		{
			"*************** ORDERS ": "*********************** ",
			"Peticion /POST": "/order, para crear la orden en la base de datos",
			"Peticion /PUT": "/order, para modificar la orden en la base de datos",
			"Peticion /POST":
				"/detailorder, para crear el detalle de la orden en la base de datos",
			"Peticion /GET":
				"/orders, para obtener todos los usuarios y sus ordenes de la base de datos",
			"Peticion /GET":
				"/order/:userid/orders, para obtener todas las ordenes de un usuario",
		},

		{
			"*************** ADDRESS ": "*********************** ",
			"Peticion /POST": "/address, para crear la orden en la base de datos",
		},

		{
			"Peticion /GET":
				"/addresses/id/streets, para obtener los domicilios del usuario",
		},
		{
			"Peticion /PUT": "/address/id, para modificar el domicilio del usuario",
		},
		{
			"Peticion /DELETE":
				"address/?id=xx&userId=xx, debe ser por query para eliminar el domicilio del usuario",
		},
		{
			"*************** MAIL ": "*********************** ",
			"Peticion /POST": "/mail, para crear el correo y enviarlo",
		},
	]);
});

module.exports = router;
