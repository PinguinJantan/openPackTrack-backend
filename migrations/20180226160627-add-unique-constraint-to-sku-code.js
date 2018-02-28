'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Skus', ['code'], {
      type: 'unique',
      name: 'sku_code_unique_constraint'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Skus', 'sku_code_unique_constraint')
  }
};
