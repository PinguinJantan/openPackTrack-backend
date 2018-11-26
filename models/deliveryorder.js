'use strict';
module.exports = function(sequelize, DataTypes) {
  var DeliveryOrder = sequelize.define('DeliveryOrder', {
    number: DataTypes.STRING
  }, {});
  DeliveryOrder.associate= function(models){
    DeliveryOrder.hasMany(models.Output,{foreignKey: 'deliveryOrderId'})
    DeliveryOrder.hasMany(models.ItemDeliveryOrder,{foreignKey: 'deliveryOrderId'})
  }
  return DeliveryOrder;
};
