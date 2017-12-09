'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Skus", "gender")
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Skus", "gender", {
      type: Sequelize.STRING
    })
  }
};
