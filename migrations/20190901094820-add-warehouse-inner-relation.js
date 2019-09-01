'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Inners', 'warehouseId', {
      type: Sequelize.INTEGER,
    })
    .then(() => {
      return queryInterface.addConstraint('Inners', ['warehouseId'], {
        type: 'FOREIGN KEY',
        name: 'Inners_werehouseId_fkey',
        references: {
          table: 'Warehouses',
          field: 'id',
        }
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Inners', 'warehouseId')
  }
};
