'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    count: DataTypes.INTEGER,
    cartonId: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM,
      values: ['solid','mix']
    }
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.hasMany(models.Carton,{foreignKey: 'cartonId',as: 'carton'})

  };
  return Profile;
};
