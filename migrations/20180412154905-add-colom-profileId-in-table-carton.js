'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Cartons","profileId",{
      type: Sequelize.INTEGER,
      references: {
       model: 'Profiles',
       key: 'id'
     }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Cartons","profileId")
  }
};
