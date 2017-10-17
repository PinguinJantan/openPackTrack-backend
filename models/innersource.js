'use strict';
module.exports = function(sequelize, DataTypes) {
  var InnerSource = sequelize.define('InnerSource', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        InnerSource.hasMany(models.Inner,{foreignKey: 'sourceId'})
      }
    }
  });
  return InnerSource;
};
