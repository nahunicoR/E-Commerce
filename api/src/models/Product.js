const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


// Creation date: November, 29
// Name in DB: products
module.exports = (sequelize) => {
  // defino el modelo  
  sequelize.define('product', {
    id: {                     
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {                  
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    category: {                  
      type: DataTypes.ENUM('Bombilla','Mate','Kit','Yerba'),
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    material: {
      type: DataTypes.STRING,
    },
    // discountprice: {                 //Precio con descuento
    //   type: DataTypes.REAL,
    // },
    // promotionprice: {                //Precio de promoción
    //   type: DataTypes.REAL,
    // },
    stock: {                           //Cantidad de piezas existentes 
       type: DataTypes.INTEGER,
       defaultValue: 70,
     },
    // productpresentation: {           //Presentación ejemplo: 300 gms, 500 gms, 1 kg
    //   type: DataTypes.STRING(15),
    // },
    // productimage: {                   //URL de la imagen
    //   type: DataTypes.STRING(255),
    // },
    // productdescription: {             //Descripción del producto
    //   type: DataTypes.TEXT,
    // },
    // created: {
    //   type: DataTypes.STRING, // Probar boolean
    //   defaultValue: "true",
    // },
  },
  {
    //agregando la propiedad paranoid automaticamente se crea una columna deleteAt que inicia en null y cuando se llama al Metodo destroy el registro queda oculto 
    paranoid: true,
    timestamps: true,
  });
};
