'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Genders',
      [
        {
          "name":"Man",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Woman",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Junior",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      ],{})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Genders',null,{})
  }
};
