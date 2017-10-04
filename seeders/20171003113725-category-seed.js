'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'Categories',
      [
        {
          "name":"Tae Kwon Do",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Badminton",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Tennis",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Casual",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Hiking",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Futsal",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Jogging",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Running",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Golf",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Sandal",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name":"Women Casual",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      ],{})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Categories',null,{})
  }
};
