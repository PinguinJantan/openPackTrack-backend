'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Outputs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deliveryOrderId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'DeliveryOrders',
         key: 'id'
       }
      },
      innerId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'Inners',
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
    return queryInterface.dropTable('Outputs');
  }
};
