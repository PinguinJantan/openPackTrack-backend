'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Skus", "colorId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'Colors',
        key: 'id'
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Skus", "colorId")
  }
};
