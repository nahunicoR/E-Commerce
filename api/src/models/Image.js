const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


// Creation date: January 5, 2023
// Name in DB: Image
// Author: Alejandro Téllez Aguilar

module.exports = (sequelize) => {
  // defino el modelo  
  sequelize.define('image', {
    id: {                     
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    url: {                        //Guarda la URL de la imagen en la nube                  
      type: DataTypes.STRING,
    },
    public_id: {                     //Carpeta dentro de la nube donde serán guardados
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  });
};