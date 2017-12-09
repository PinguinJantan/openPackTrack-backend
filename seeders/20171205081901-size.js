'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Sizes',
      [
        {
          "name":"30",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"31",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"32",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"33",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"34",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"35",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"36",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"37",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"38",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"39",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"40",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"41",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"42",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"43",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"44",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"45",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"46",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"47",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"48",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"49",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }],{})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Sizes',null,{})
  }
};
