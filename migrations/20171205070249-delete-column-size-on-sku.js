'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Skus", "size")
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Skus", "size", {
      type: Sequelize.STRING
    })
  }
};
