'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inner = sequelize.define('Inner', {
    barcode: DataTypes.STRING,
    itemId: DataTypes.INTEGER,
    cartonId: DataTypes.INTEGER,
    isInStok: DataTypes.BOOLEAN,
    gradeId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true,
  });
  Inner.associate = function (models) {
    Inner.belongsTo(models.Item,{foreignKey: 'itemId', as: 'item'})
    Inner.belongsTo(models.Carton,{foreignKey: 'cartonId', as: 'carton'})
    Inner.belongsTo(models.InnerGrade,{foreignKey: 'gradeId', as: 'innerGrade'})
    Inner.belongsTo(models.InnerSource,{foreignKey: 'sourceId', as: 'innerSource'})
    Inner.hasMany(models.Retur,{foreignKey: 'innerId'})
    Inner.hasMany(models.Retur,{foreignKey: 'innerId'})
    Inner.hasMany(models.Output,{foreignKey: 'innerId'})
    Inner.hasMany(models.InnerReport,{foreignKey: 'innerId', as: 'inner'})

  }
  return Inner;
};
