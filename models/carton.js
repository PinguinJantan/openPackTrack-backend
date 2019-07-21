'use strict';
module.exports = function(sequelize, DataTypes) {
  var Carton = sequelize.define('Carton', {
    barcode: DataTypes.STRING,
    profileId: DataTypes.INTEGER,
    warehouseId: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true,
  });
  Carton.associate = function (models) {
    Carton.belongsTo(models.Warehouse,{foreignKey: 'warehouseId',as: 'warehouse'})
    Carton.hasMany(models.Inner,{foreignKey: 'cartonId',as: 'inner'})
    Carton.belongsTo(models.Profile,{foreignKey: 'profileId',as: 'profile'})
  }
  return Carton;
};
