'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Profiles","cartonId")
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Profiles","cartonId",{
      type: Sequelize.INTEGER,
      allowNull:false,
      references: {
       model: 'Cartons',
       key: 'id'
     }
    })
  }
};
