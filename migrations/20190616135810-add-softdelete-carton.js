'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Cartons', 'deletedAt', {
      type: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Cartons', 'deletedAt')
  }
};
