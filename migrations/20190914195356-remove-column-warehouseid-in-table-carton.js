'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Cartons", "warehouseId")
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Cartons", "warehouseId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Warehouses',
        key: 'id'
      }
    })
  }
};
