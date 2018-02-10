'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inner = sequelize.define('Inner', {
    barcode: DataTypes.STRING,
    itemId: DataTypes.INTEGER,
    cartonId: DataTypes.INTEGER,
    isInStok: DataTypes.BOOLEAN,
    gradeId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER
  }, {});
  Inner.associate = function (models) {
    Inner.belongsTo(models.Item,{foreignKey: 'itemId'})
    Inner.belongsTo(models.Carton,{foreignKey: 'cartonId'})
    Inner.belongsTo(models.InnerGrade,{foreignKey: 'gradeId'})
    Inner.belongsTo(models.InnerSource,{foreignKey: 'sourceId'})
    Inner.hasMany(models.Retur,{foreignKey: 'innerId'})
    Inner.hasMany(models.Retur,{foreignKey: 'innerId'})
    Inner.hasMany(models.Output,{foreignKey: 'innerId'})
    Inner.hasMany(models.InnerDeliveryOrder,{foreignKey: 'innerId'})
    Inner.hasMany(models.InnerReport,{foreignKey: 'innerId'})

  }
  return Inner;
};
