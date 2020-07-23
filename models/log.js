'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    diffPrev: DataTypes.JSON,
    diffNext: DataTypes.JSON,
    op: DataTypes.STRING,
    resource: DataTypes.STRING,
    resourceID: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    ref: DataTypes.STRING,
    refID: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true,
  });
  Log.associate = function(models) {
    // associations can be defined here
  };
  return Log;
};