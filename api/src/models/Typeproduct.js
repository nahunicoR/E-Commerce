const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


// Creation date: November, 29
// Name in DB: products
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('typeproduct', {
    typeproductid: {                     //Id del tiopó de producto
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nametypeproduct: {                   //Nombre del tipo producto
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
    created: {
      type: DataTypes.STRING, // Probar boolean
      defaultValue: "true",
    },
  },
  {
    timestamps: false,
  });
};
