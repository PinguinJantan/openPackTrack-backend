'use strict';
module.exports = function(sequelize, DataTypes) {
  var Warehouse = sequelize.define('Warehouse', {
    name: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {});
  Warehouse.associate = function (models) {
    Warehouse.hasMany(models.Carton,{foreignKey: 'warehouseId',as:'warehouse'})
    Warehouse.hasMany(models.User,{foreignKey: 'warehouseId'})
  }
  return Warehouse;
};
