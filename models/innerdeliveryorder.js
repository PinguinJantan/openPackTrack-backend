'use strict';
module.exports = function(sequelize, DataTypes) {
  var InnerDeliveryOrder = sequelize.define('InnerDeliveryOrder', {
    quantity: DataTypes.INTEGER,
    innerId: DataTypes.INTEGER,
    deliveryOrderId: DataTypes.INTEGER
  }, {});
  InnerDeliveryOrder.associate = function(models){
    InnerDeliveryOrder.belongsTo(models.Inner,{foreignKey: 'innerId'})
    InnerDeliveryOrder.belongsTo(models.DeliveryOrder,{foreignKey: 'deliveryOrderId'})
  }
  return InnerDeliveryOrder;
};
