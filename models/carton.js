'use strict';
module.exports = function(sequelize, DataTypes) {
  var Carton = sequelize.define('Carton', {
    barcode: DataTypes.STRING,
    warehouseId: DataTypes.INTEGER
  }, {});
  Carton.associate = function (models) {
    Carton.belongsTo(models.Warehouse,{foreignKey: 'warehouseId'})
    Carton.hasMany(models.Inner,{foreignKey: 'cartonId',as: 'inner'})
    Carton.hasMany(models.Profile,{foreignKey: 'cartonId',as: 'profile'})
  }
  return Carton;
};
