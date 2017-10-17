'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemDeliveryOrder = sequelize.define('ItemDeliveryOrder', {
    quantity: DataTypes.INTEGER,
    innerId: DataTypes.INTEGER,
    deliveryOrderId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ItemDeliveryOrder;
};