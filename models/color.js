'use strict';
module.exports = function(sequelize, DataTypes) {
  var Color = sequelize.define('Color', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Color;
};