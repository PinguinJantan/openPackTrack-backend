'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ItemDeliveryOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      innerId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'Inners',
         key: 'id'
       }
      },
      deliveryOrderId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'DeliveryOrders',
         key: 'id'
       }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ItemDeliveryOrders');
  }
};
