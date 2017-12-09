'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Colors',
      [
        {
          "name":"Black/White",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Black/Citroon",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Lime/Gray",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Black/Black",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      ],{})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Colors',null,{})
  }
};
