'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Skus", "genderId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'Genders',
        key: 'id'
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Skus", "genderId")
  }
};
