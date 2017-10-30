'use strict';
module.exports = function(sequelize, DataTypes) {
  var Carton = sequelize.define('Carton', {
    barcode: DataTypes.STRING,
    warehouseId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Carton.belongsTo(models.Warehouse,{foreignKey: 'warehouseId'})
        Carton.hasMany(models.Inner,{foreignKey: 'cartonId'})
      }
    }
  });
  return Carton;
};
