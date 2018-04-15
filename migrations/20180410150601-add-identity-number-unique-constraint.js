'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint(
      'Users',
      ['identityNumber'],
      {
        type: 'unique',
        name: 'identity_number_unique_constraint'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint(
      'Users',
      'identity_number_unique_constraint',
      {
        type: 'unique'
      }
    );
  }
};
