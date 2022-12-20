const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


/* Creation date: December, 15
 Name in DB: orderdetails
 Author: Alejandro Téllez Aguilar
 Description: Para almacenar los productos de cada orden
*/ 


module.exports = (sequelize) => {
  // defino el modelo  
  sequelize.define('orderdetail', {
    purchasedamount: {                 //Cantidad de producto comprado               
      type: DataTypes.REAL,
      allowNull: false,
    },
    purchaseprice: {                   //Precio de Compra (precio al día del producto)
      type: DataTypes.REAL,
      allowNull: false,
    },
    
  },
  {
    timestamps: true,
  });
};