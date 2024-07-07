'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.client2, {as:"cliente", foreignKey : "idcliente"})
      this.hasMany(models.product, {as:"producto", foreignKey : "idproducto"})
    }
  }
  order.init({
    idpedido: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
    total: DataTypes.FLOAT

  }, {
    sequelize,
    modelName: 'order',
    freezeTableName: true, // Deshabilita la pluralización
    tableName: 'order', // Nombre exacto de la tabla
  });
  return order;
};