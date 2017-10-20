'use strict';
module.exports = function(sequelize, DataTypes) {
  var InnerGrade = sequelize.define('InnerGrade', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        InnerGrade.belongsTo(models.Inner,{foreignKey: 'gradeId'})
      }
    }
  });
  return InnerGrade;
};