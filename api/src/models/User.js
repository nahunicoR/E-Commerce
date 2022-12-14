const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {                     
      type: DataTypes.INTEGER,          //id del Usuario
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {                            //Nombre del usuario
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {                             //Papel que desempeña en el sistema
      type: DataTypes.ENUM('user','guest','admin','superadmin', 'denegado'),
    },
    email: {                           //Correo del usuario
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: {
          msg: 'El email necesita ser unico'
      },
      validate: {
          isEmail: {
              msg: 'Email no valido'
          },
          notEmpty: {
              msg: 'Ingrese un email'
          }
      }
  }
  });
  
};
