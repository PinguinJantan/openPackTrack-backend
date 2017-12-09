'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Items', [
    {
      "code": "I122221",
      "sizeId": 18,
      "skuId": 1,
      "createdAt": new Date(),
      "updatedAt": new Date()
    },
    {
      "code": "I122222",
      "sizeId": 18,
      "skuId": 2,
      "createdAt": new Date(),
      "updatedAt": new Date()
    },
    {
      "code": "I122223",
      "sizeId": 18,
      "skuId": 3,
      "createdAt": new Date(),
      "updatedAt": new Date()
    },
    {
      "code": "I122224",
      "sizeId": 18,
      "skuId": 4,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Items', null, {});
  }
};
