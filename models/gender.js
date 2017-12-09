'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gender = sequelize.define('Gender', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Gender;
};