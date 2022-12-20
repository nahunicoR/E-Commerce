const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


// Creation date: December, 19
// Name in DB: adresss
// Author: Alejandro Téllez Aguilar

module.exports = (sequelize) => {
  // defino el modelo  
  sequelize.define('address', {
    id: {                     
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    mainstreet: {                      //Calle principal                 
      type: DataTypes.STRING,
    },
    number: {                        //Número exterior
      type: DataTypes.INTEGER,
    },
    postalcode: {                    //Código postal
      type: DataTypes.INTEGER,
      validate: {
          isNumeric: {
              msg: 'Debe ser un número'
          }
      }
    },
    street1: {                       //Entre la calle 1
      type: DataTypes.STRING,
    }, 
    street2: {                       //Entre la calle 2
      type: DataTypes.STRING,
    }, 
    name: {                          //Nombre de quien recibe
      type: DataTypes.STRING,
    }, 
    phonenumber: {                   //Número telefónico de la persona que recibe
      type: DataTypes.STRING,
    }, 
    additionals: {                   //Comentarios adicionales
      type: DataTypes.STRING(128),
    }, 


  },
  {
    timestamps: true,
  });
};