'use strict';
module.exports = function(sequelize, DataTypes) {
  var DeliveryOrder = sequelize.define('DeliveryOrder', {
    number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return DeliveryOrder;
};