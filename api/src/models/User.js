const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  
  //corrijo el modelo de User, de acuerdo a lo que debiera mandar Auth0 desde Front-End.
  //queda pendiente la validación de roles en back, ver si es necesaria la asignacion de roles.
  sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email no valido'
        },
        isLowercase:{
          args: true,
          msg: 'El email debe ser en minuscula'
        }
      }
    },
    name: {                            //Nombre del usuario
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg:"El campo no puede estar vacio"
        },
        len:{
          args:[3,70],
          msg:"El nombre tiene que ser entre 3 y 70 caracteres"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg:"El campo no puede estar vacio"
        },
        len:{
          args:[3,70],
          msg:"El apellido tiene que ser entre 3 y 70 caracteres"
        }
      }
    },
    
    rol: {
      type: DataTypes.ENUM,
      values: ['user','superadmin','guest','admin','denegado'],
      defaultValue: 'user'
   },
  });
};
