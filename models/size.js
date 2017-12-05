'use strict';
module.exports = function(sequelize, DataTypes) {
  var Size = sequelize.define('Size', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Size;
};