'use strict';
module.exports = function(sequelize, DataTypes) {
  var InnerGrade = sequelize.define('InnerGrade', {
    name: DataTypes.STRING
  }, {});
  InnerGrade.associate = function (models) {
    InnerGrade.hasMany(models.Inner,{foreignKey: 'gradeId',as:'inner'})
  }
  return InnerGrade;
};
