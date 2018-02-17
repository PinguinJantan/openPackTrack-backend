'use strict';
module.exports = (sequelize, DataTypes) => {
  var Report = sequelize.define('Report', {

  }, {});
  Report.associate= function(models){
    Report.hasMany(models.InnerReport,{foreignKey: 'reportId',as:'innerReport'})
  }
  return Report;
};
