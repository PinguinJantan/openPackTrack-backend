'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Skus", "color")
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Skus", "color", {
      type: Sequelize.STRING
    })
  }
};
