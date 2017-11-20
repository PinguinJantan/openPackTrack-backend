'use strict';
module.exports = (sequelize, DataTypes) => {
  var Report = sequelize.define('Report', {
    innerId: DataTypes.INTEGER
  }, {});
  Report.associate= function(models){
    Report.hasOne(models.Inner,{foreignKey: 'innerId'})
  }
  return Report;
};
