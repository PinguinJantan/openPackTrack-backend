'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Profiles', 'mixAmount', {
      type: Sequelize.INTEGER
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Profiles', 'mixAmount')
  }
};
