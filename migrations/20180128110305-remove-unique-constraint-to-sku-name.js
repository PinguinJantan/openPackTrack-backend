'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Skus', 'sku_name_unique_constraint')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Skus', ['name'], {
      type: 'unique',
      name: 'sku_name_unique_constraint'
    })
  }
};
