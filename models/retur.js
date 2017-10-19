'use strict';
module.exports = function(sequelize, DataTypes) {
  var Retur = sequelize.define('Retur', {
    returnNumber: DataTypes.STRING,
    description: DataTypes.TEXT,
    innerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Retur.hasMany(models.Inner,{foreignKey: 'innerId'})
      }
    }
  });
  return Retur;
};
