const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


// Creation date: December, 1
// Name in DB: products
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('seller', {
    idproduct: {                     //Id del vendedor
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sellername: {                   //Nombre del vendedor
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sellerhome: {                   //Domicilio del vendedor
      type: DataTypes.STRING,
    },
    sellerzip: {                    //Código postal del vendedor
      type: DataTypes.INTEGER,
    },
    sellerphone: {                  //Teléfono del vendedor
      type: DataTypes.STRING,
    },
    sellermail: {                  //email del vendedor
        type: DataTypes.STRING,
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