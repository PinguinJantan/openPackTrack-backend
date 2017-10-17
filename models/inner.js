'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inner = sequelize.define('Inner', {
    barcode: DataTypes.STRING,
    itemId: DataTypes.INTEGER,
    cartonId: DataTypes.INTEGER,
    inInStok: DataTypes.BOOLEAN,
    gradeId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Inner;
};