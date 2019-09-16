'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Inners", "warehouseId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Warehouses',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Inners", "warehouseId")
  }
};
