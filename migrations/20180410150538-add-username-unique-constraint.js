'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint(
      'Users',
      ['username'],
      {
        type: 'unique',
        name: 'username_unique_constraint'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint(
      'Users',
      'username_unique_constraint',
      {
        type: 'unique'
      }
    );
  }
};
