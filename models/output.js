'use strict';
module.exports = function(sequelize, DataTypes) {
  var Output = sequelize.define('Output', {
    deliveryOrderId: DataTypes.INTEGER,
    innerId: DataTypes.INTEGER
  }, {});
  Output.associate = function (models) {
    Output.belongsTo(models.Inner,{foreignKey: 'innerId'})
    Output.belongsTo(models.DeliveryOrder,{foreignKey: 'deliveryOrderId'})
  }
  return Output;
};
