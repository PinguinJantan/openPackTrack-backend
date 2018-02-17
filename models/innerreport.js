'use strict';
module.exports = (sequelize, DataTypes) => {
  var InnerReport = sequelize.define('InnerReport', {
    innerId: DataTypes.INTEGER,
    reportId: DataTypes.INTEGER
  }, {});
  InnerReport.associate= function(models){
    InnerReport.belongsTo(models.Inner,{foreignKey: 'innerId'})
    InnerReport.belongsTo(models.Report,{foreignKey: 'reportId',as: 'report'})
  }
  return InnerReport;
};
