'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Categories', ['name'], {
      type: 'unique',
      name: 'category_name_unique_constraint'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Categories', 'category_name_unique_constraint')
  }
};
