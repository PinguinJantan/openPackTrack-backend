'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('InnerGrades', [
      { name: 'A', createdAt: new Date(), updatedAt: new Date() },
      { name: 'B', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('InnerGrades', null, {});
  }
};
