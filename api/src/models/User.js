const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {                     
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:"El campo no puede estar vacio"
        },
        isAlpha:{
          args: true,
          msg:"El nombre solo puede contener letras"
        },
        len:{
          args:[3,70],
          msg:"El nombre tiene que ser entre 3 y 70 caracteres"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:"El campo no puede estar vacio"
        },
        isAlpha:{
          args: true,
          msg:"El apellido solo puede contener letras"
        },
        len:{
          args:[3,70],
          msg:"El apellido tiene que ser entre 3 y 70 caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
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
    rol: {
      type: DataTypes.ENUM,
      values: ['user','superadmin','guest','admin','denegado'],
      defaultValue: 'user'
   },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  });
};
