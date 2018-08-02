'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
    mixAmount: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM,
      values: ['solid', 'assort', 'mix']
    }
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.hasMany(models.Carton, {foreignKey: 'profileId', as: 'carton'})
    Profile.hasMany(models.ProfileItem, {foreignKey: 'profileId', as: 'profileItem'})
  };
  return Profile;
};
