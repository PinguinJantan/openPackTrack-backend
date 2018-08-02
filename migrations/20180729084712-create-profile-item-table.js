'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('ProfileItems', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        profileId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Profiles',
            key: 'id'
          }
        },
        itemId: {
          type: Sequelize.INTEGER,
          allowNull: true, // profil mix tidak butuh ref ke item
          references: {
            model: 'Items',
            key: 'id'
          }
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('ProfileItems');
  }
};
