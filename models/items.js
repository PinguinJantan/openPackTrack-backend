'use strict';
module.exports = function(sequelize, DataTypes) {
  var Items = sequelize.define('Items', {
    sku: DataTypes.STRING,
    barcode: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Items.hasOne(models.Categories,{foreignKey: 'categoryId'})
      }
    }
  });
  return Items;
};
