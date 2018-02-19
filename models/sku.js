'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sku = sequelize.define('Sku', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    genderId: DataTypes.INTEGER
  }, {});
  Sku.associate = function (models) {
    Sku.belongsTo(models.Category, {foreignKey: 'categoryId', as: 'category'})
    Sku.hasMany(models.Item, {foreignKey: 'skuId', as: 'sku'})
    Sku.belongsTo(models.Color, {foreignKey: 'colorId', as: 'color'})
    Sku.belongsTo(models.Gender, {foreignKey: 'genderId', as: 'gender'})
  }
  return Sku;
};
