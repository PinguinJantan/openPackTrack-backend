'use strict';
module.exports = function(sequelize, DataTypes) {
  var InnerDeliveryOrder = sequelize.define('InnerDeliveryOrder', {
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
  return InnerDeliveryOrder;
};
