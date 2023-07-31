const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  
  //corrijo el modelo de User, de acuerdo a lo que debiera mandar Auth0 desde Front-End.
  //queda pendiente la validación de roles en back, ver si es necesaria la asignacion de roles.
  sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {                            //Nombre del usuario
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'user'
   }
  },{
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    }
  });
};
