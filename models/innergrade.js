'use strict';
module.exports = function(sequelize, DataTypes) {
  var InnerGrade = sequelize.define('InnerGrade', {
    name: DataTypes.STRING
  }, {});
  // InnerGrade.associate = function (models) {
  //   InnerGrade.belongsTo(models.Inner,{foreignKey: 'gradeId'})
  // }
  return InnerGrade;
};
