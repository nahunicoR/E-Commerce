const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('notification', {
    id: {                     
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    norder: {                 //Costo o Monto de lo comprado                 
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  });
};