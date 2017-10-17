'use strict';
module.exports = function(sequelize, DataTypes) {
  var Carton = sequelize.define('Carton', {
    barcode: DataTypes.STRING,
    werehouseId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Carton.belongsTo(models.Warehouse,{foreignKey: 'id'})
      }
    }
  });
  return Carton;
};
