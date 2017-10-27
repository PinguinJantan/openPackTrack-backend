'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    sku: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  Item.associate = function (models) {
    Item.belongsTo(models.Category,{foreignKey: 'categoryId'})
    // Item.belongsTo(models.Inner,{foreignKey: 'itemId'})
  }
  return Item;
};
