'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint(
      'Users',
      'username_email_identity_unique',
      {
        type: 'unique'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint(
      'Users',
      ['username', 'email', 'identityNumber'],
      {
        type: 'unique',
        name: 'username_email_identity_unique'
      }
    );
  }
};
