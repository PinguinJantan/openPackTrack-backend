'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    sku: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Items.hasOne(models.Category,{foreignKey: 'categoryId'})
      }
    }
  });
  return Item;
};
