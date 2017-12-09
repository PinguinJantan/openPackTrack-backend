'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Skus', [
      {
       "name": "FOCUS B JR",
       "code": "FGJ01FOCUB",
       "categoryId": 1,
       "colorId": 4,
       "genderId": 3,
       "createdAt": new Date(),
       "updatedAt": new Date()
      },{
       "name": "LATIO B",
       "code": "FGJ01LATIO",
       "categoryId": 2,
       "colorId": 4,
       "genderId": 3,
       "createdAt": new Date(),
       "updatedAt": new Date()
      },{
       "name": "LIBERTY B JR",
       "code": "FGJ01LIBEB",
       "categoryId": 1,
       "colorId": 2,
       "genderId": 3,
       "createdAt": new Date(),
       "updatedAt": new Date()
      },{
       "name": "ARUMBA B",
       "code": "FGJ04ARUMB",
       "categoryId": 1,
       "colorId": 4,
       "genderId": 1,
       "createdAt": new Date(),
       "updatedAt": new Date()
      },{
       "name": "VALLEN BM",
       "code": "FGW07VALLENBM",
       "categoryId": 1,
       "colorId": 4,
       "genderId": 2,
       "createdAt": new Date(),
       "updatedAt": new Date()
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Skus', null, {});
  }
};
