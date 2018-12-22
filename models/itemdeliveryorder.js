'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemDeliveryOrder = sequelize.define('ItemDeliveryOrder', {
    quantity: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    deliveryOrderId: DataTypes.INTEGER
  }, {});
  ItemDeliveryOrder.associate = function(models){
    ItemDeliveryOrder.belongsTo(models.Item,{foreignKey: 'itemId'})
    ItemDeliveryOrder.belongsTo(models.DeliveryOrder,{foreignKey: 'deliveryOrderId'})
  }
  return ItemDeliveryOrder;
};
