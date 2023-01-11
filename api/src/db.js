require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");


//no comentar linea debajo, sirve para pruebas locales de Back-End.

const { /*DB_USER, DB_PASSWORD, DB_HOST ,*/ DB_DEPLOY } = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecomerce`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });



//  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecomerce`, {
//  	logging: false, // set to console.log to see the raw SQL queries
//  	native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//  });

const sequelize = new Sequelize(DB_DEPLOY, {
	logging: false, // set to console.log to see the raw SQL queries
	native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Order, Orderdetail, Product, Address, Review, Image, Notification } = sequelize.models; // Importar Modelos

// Aca vendrian las relaciones
// Relación uno a muchos

//Usario tendrá muchas ordenes de compra (Para surtir la orden o carrito)
//Se añade la propiedad id de User a la tabla Order
User.hasMany(Order, { as: "ordenes", foreignkey: "email" });
Order.belongsTo(User, { as: "user" });            //No se requiere generar una foreignkey por ya se creando el id
Order.belongsTo(Address, { as: "addressorder"});  //Una orden debe llevar el domicilio

Order.belongsToMany(User, {through: 'OrderUser' })
User.belongsToMany(Order, {through: 'OrderUser' })

Notification.belongsToMany(User, {through: 'userNotif' })
User.belongsToMany(Notification, {through: 'userNotif' })

//La orden está formada por muchos productos
Product.hasMany(Orderdetail, { as: "orderdetails", foreignkey: "id" });
// El producto tiene muchas imagebes
Orderdetail.belongsTo(Product, { as: "product" });
Product.hasMany(Image, { as: "imageproduct"});

//y además, la Orden es el encabezado del detalle de la orden, por lo que Order es uno a mucho Orderdetail
Order.hasMany(Orderdetail, { as: "headorder", foreignkey: "id" });

//Para relacionar al User con Address
User.hasMany(Address, { as: "streets", foreignkey: "id" });
//Address.belongsTo(User, { as: "user"});  //No se requiere generar una foreignkey por ya se creando el id

//relaciones productos, usuario, review Author: Sebastián
Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review ,{  foreignkey: "userEmail" });
Review.belongsTo(User);

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};