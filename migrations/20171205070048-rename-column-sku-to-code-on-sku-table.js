'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("Skus", "sku", "code")
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("Skus", "code", "sku")
  }
};
