'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diffPrev: {
        type: Sequelize.JSON
      },
      diffNext: {
        type: Sequelize.JSON
      },
      op: {
        type: Sequelize.STRING
      },
      resource: {
        type: Sequelize.STRING
      },
      resourceID: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.STRING
      },
      ref: {
        type: Sequelize.STRING
      },
      refID: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Logs');
  }
};