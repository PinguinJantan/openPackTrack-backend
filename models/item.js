'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    code: DataTypes.STRING,
    sizeId: DataTypes.INTEGER,
    skuId: DataTypes.INTEGER
  }, {});
  Item.associate = function(models){
    Item.belongsTo(models.Sku, {foreignKey: 'skuId', as: 'sku'})
    Item.belongsTo(models.Size, {foreignKey: 'sizeId', as: 'size'})
  }
  return Item;
};
