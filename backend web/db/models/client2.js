'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.address, {as:"direc", foreignKey : "idaddress"})
      this.hasMany(models.order, {as:"pedi", foreignKey : "idpedido"})

    }
  }
  client2.init({
    idcliente:{

     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
}    ,
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contrasena: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'client2',
    freezeTableName: true, // Deshabilita la pluralización
    tableName: 'client2', // Nombre exacto de la tabla
  });
  return client2;
};