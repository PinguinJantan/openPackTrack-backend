'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint(
      'Users',
      ['email'],
      {
        type: 'unique',
        name: 'email_unique_constraint'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint(
      'Users',
      'email_unique_constraint',
      {
        type: 'unique'
      }
    );
  }
};
