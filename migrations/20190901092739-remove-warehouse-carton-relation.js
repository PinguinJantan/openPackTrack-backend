'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Cartons', 'warehouseId')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Cartons', 'warehouseId', {
      type: Sequelize.INTEGER,
    })
    .then(() => {
      return queryInterface.addConstraint('Cartons', ['warehouseId'], {
        type: 'FOREIGN KEY',
        name: 'Cartons_werehouseId_fkey',
        references: {
          table: 'Warehouses',
          field: 'id',
        }
      })
    })
  }
};
