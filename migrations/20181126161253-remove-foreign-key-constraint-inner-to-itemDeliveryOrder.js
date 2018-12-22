'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.removeConstraint('ItemDeliveryOrders', 'ItemDeliveryOrders_innerId_fkey')
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.addConstraint('ItemDeliveryOrders',['innerId'],{
      type:'foreign key',
      name: 'ItemDeliveryOrders_innerId_fkey',
      references:{
        table:'Inners',
        field:'id'
      }
    })
  }
};
