const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


// Creation date: November, 29
// Name in DB: products
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    idProduct: {                     //Id del producto
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {                   //Nombre del producto
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {                   //Precio Normal
      type: DataTypes.REAL,
    },
    stock: {                  //Cantidad de piezas existentes 
      type: DataTypes.INTEGER,
    },
    img: {                   //URL de la imagen
      type: DataTypes.STRING(255),
    },
    description: {             //Descripción del producto
      type: DataTypes.TEXT,
    },
    created: {
      type: DataTypes.BOOLEAN, // Probar boolean
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  });
};
