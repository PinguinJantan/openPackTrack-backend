'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    code: DataTypes.STRING,
    sizeId: DataTypes.INTEGER,
    skuId: DataTypes.INTEGER,
    barcode: DataTypes.STRING,
  }, {
    timestamps: true,
    paranoid: true,
  });
  Item.associate = function(models){
    Item.hasMany(models.Inner,{foreignKey: 'itemId', as:'inner'})
    Item.belongsTo(models.Sku, {foreignKey: 'skuId', as: 'sku'})
    Item.belongsTo(models.Size, {foreignKey: 'sizeId', as: 'size'})
    Item.hasMany(models.ItemDeliveryOrder, {
  foreignKey: 'itemId'
})
  }
  return Item;
};
