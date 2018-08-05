'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Profiles', 'name', {
      type: Sequelize.STRING,
      unique: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Profiles', 'name')
  }
};
