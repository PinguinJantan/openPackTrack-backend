'use strict';
module.exports = (sequelize, DataTypes) => {
  var Report = sequelize.define('Report', {
    
  }, {});
  Report.associate= function(models){
    Report.belongsTo(models.InnerReport,{foreignKey: 'reportId'})
  }
  return Report;
};