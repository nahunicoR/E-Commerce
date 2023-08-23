const { Router } = require("express");
const router = Router();

// Importar todos los routers;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/product", require("./createProduct"));
router.use("/products", require("./getProducts"));
router.use("/product", require("./deleteProduct"));
router.use("/product", require("./getProductById"));
router.use("/product", require("./updateProduct"));
router.use("/product", require("./getProductByName"));
router.use("/product", require("./getImageByProduct"));
router.use("/image", require("./deleteImageProduct"));

/* Para Reviews */

router.use("/product", require("./createReview"));
router.use("/reviews", require("./getAllReview"));
router.use("/review", require("./updateReview"));
router.use("/review", require("./deleteReview"));
// router.use('/reviews'        , getAllReviewByProduct); para pruebas con bulkCreate

/* Para usuarios */

router.use("/users", require("./getUsers"));
router.use("/users", require("./getUserIdOrders"));
router.use("/login", require("./postLogin"));
router.use("/user", require("./createUser")); //Creado por Jesús Delgado
router.use("/user", require("./updateUser"));
router.use("/user", require("./getUserbyEmail"));

/* Para Ordenes */

router.use("/order", require("./createOrder"));
router.use("/detailorder", require("./createDetailorder"));
router.use("/order", require("./packOffOrder"));
router.use("/orders", require("./getOrdersUsers"));
router.use("/order", require("./getOrderByUser"));
router.use("/order", require("./getOrderStatus"));

/* Para Address */

router.use("/address", require("./createAddress"));
router.use("/addresses", require("./getAddressByUser"));
router.use("/address", require("./updateAddressUser"));
router.use("/address", require("./deleteAddressUser"));

/*   Para Mails   */

router.use("/", require("./createMail"));

/* Para Cloudinary */

router.use("/", require("./uploadImage"));

/* Para Mercado Pago*/
router.use("/payment", require("./createPayment"));
router.use("/payment/result", require("./getPayment"));
router.use("/payment/:id", require("./getPaymentById"));
router.use("/payment", require("./paymentNotification"));


module.exports = router;