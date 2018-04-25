'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users','deletedAt',{
      type: Sequelize.DATE
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users','deletedAt')
  }
};
