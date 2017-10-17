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
        Item.hasOne(models.Category,{foreignKey: 'categoryId'})
        Item.belongsTo(models.Inner,{foreignKey: 'itemId'})
      }
    }
  });
  return Item;
};
