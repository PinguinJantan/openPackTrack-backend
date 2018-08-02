'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProfileItem = sequelize.define('ProfileItem', {
    itemId: DataTypes.INTEGER,
    profileId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  ProfileItem.associate = function(models) {
    // associations can be defined here
    ProfileItem.belongsTo(models.Profile, {foreignKey: 'profileId', as: 'profile'})
    ProfileItem.belongsTo(models.Item, {foreignKey: 'itemId', as: 'item'})

  };
  return ProfileItem;
};
