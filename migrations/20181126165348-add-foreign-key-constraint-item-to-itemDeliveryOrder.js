'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  return queryInterface.addConstraint('ItemDeliveryOrders', ['itemId'], {
     type: 'foreign key',
     name: 'ItemDeliveryOrders_itemId_fkey',
     references: {
       table: 'Items',
       field: 'id'
     }
   })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  return queryInterface.removeConstraint('ItemDeliveryOrders', 'ItemDeliveryOrders_itemId_fkey')
  }
};
