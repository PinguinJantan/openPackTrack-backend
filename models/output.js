'use strict';
module.exports = function(sequelize, DataTypes) {
  var Output = sequelize.define('Output', {
    deliveryOrderId: DataTypes.INTEGER,
    innerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Output;
};