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

module.exports = router;
