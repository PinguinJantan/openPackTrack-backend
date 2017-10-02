'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addConstraint(
      'Users',
      ['username', 'email', 'identityNumber'],
      {
        type: 'unique',
        name: 'username_email_identity_unique'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeConstraint(
      'Users',
      'username_email_identity_unique',
      {
        type: 'unique'
      }
    );
  }
};
