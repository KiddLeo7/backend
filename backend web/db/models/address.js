'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.client2, {as:"direcc", foreignKey : "idcliente"})

    }
  }
  address.init({
    idaddress:{type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    linea1: DataTypes.STRING,
    linea2: DataTypes.STRING,
    distrito: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'address',
    freezeTableName: true, // Deshabilita la pluralización
    tableName: 'address', // Nombre exacto de la tabla
  });
  return address;
};