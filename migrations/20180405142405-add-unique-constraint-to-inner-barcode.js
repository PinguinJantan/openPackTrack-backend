'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Inners', ['barcode'], {
      type: 'unique',
      name: 'inner_code_unique_constraint'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Inners', 'inner_code_unique_constraint')
  }
};
