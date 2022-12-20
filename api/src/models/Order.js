const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


// Creation date: December, 12
// Name in DB: orders
// Author: Alejandro Téllez Aguilar

module.exports = (sequelize) => {
  // defino el modelo  
  sequelize.define('order', {
    id: {                     
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    purchaseCost: {                 //Costo o Monto de lo comprado                 
      type: DataTypes.REAL,
    },
    payOrder: {                     //Orden de Compra (pasarela de pago)
      type: DataTypes.STRING,
    },
    paymentMethod: {                //Para el método de pago (Mastercard, visa, etc)
      type: DataTypes.STRING,
    },
    status: {                       //Para el determinar en fase del proceso se encuentra (creada, cancelada, completa)
      type: DataTypes.ENUM('creada','cancelada','completa','proceso'),
    }, 
  },
  {
    timestamps: true,
  });
};