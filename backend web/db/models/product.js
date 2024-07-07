'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.order, {as:"orden", foreignKey : "idpedido"})
    }
  }
  product.init({
    idproduct: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    imagen: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    cantidad: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    marca: DataTypes.STRING,
    serie: DataTypes.STRING,
    tipo: DataTypes.STRING,
    stock: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'product',
    freezeTableName: true, // Deshabilita la pluralización
    tableName: 'product', // Nombre exacto de la tabla
  });
  return product;
};