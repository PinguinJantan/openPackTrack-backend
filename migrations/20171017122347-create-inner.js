'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Inners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barcode: {
        type: Sequelize.STRING
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'Items',
         key: 'id'
       }
      },
      cartonId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'Cartons',
         key: 'id'
       }
      },
      inInStok: {
        type: Sequelize.BOOLEAN
      },
      gradeId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'InnerGrades',
         key: 'id'
       }
      },
      sourceId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'InnerSources',
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
    return queryInterface.dropTable('Inners');
  }
};
