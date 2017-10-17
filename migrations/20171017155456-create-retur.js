'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Returs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      returnNumber: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Returs');
  }
};
