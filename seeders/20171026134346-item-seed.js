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
    // return queryInterface.bulkInsert('Items', [
    //   {
    //    "name": "R3 BL",
    //    "sku": "122221",
    //    "categoryId": 1,
    //    "color": "gold/ blue",
    //    "size": "47",         "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "R3 R",
    //    "sku": "122222",
    //    "categoryId": 2,
    //    "color": "Merah/ Perak",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "CRV B",
    //    "sku": "122223",
    //    "categoryId": 1,
    //    "color": "Hitam/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "CRV F",
    //    "sku": "122224",
    //    "categoryId": 1,
    //    "color": "Hitam/ Fuchsia",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "CRV C",
    //    "sku": "122225",
    //    "categoryId": 1,
    //    "color": "Hitam/ Limau",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "CRV O",
    //    "sku": "122226",
    //    "categoryId": 1,
    //    "color": "Biru/ Jingga",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Destars B",
    //    "sku": "122227",
    //    "categoryId": 1,
    //    "color": "Hitam/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Destars BW",
    //    "sku": "122228",
    //    "categoryId": 1,
    //    "color": "Hitam/ Putih",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Arumba B",
    //    "sku": "122229",
    //    "categoryId": 1,
    //    "color": "Hitam/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Mulo B",
    //    "sku": "122230",
    //    "categoryId": 1,
    //    "color": "Hitam/ Abu arang",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Mulo BW",
    //    "sku": "122231",
    //    "categoryId": 1,
    //    "color": "Hitam/ Putih",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Mulo W",
    //    "sku": "122232",
    //    "categoryId": 1,
    //    "color": "Putih/ Perak",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Prima T",
    //    "sku": "122233",
    //    "categoryId": 1,
    //    "color": "Coklat sawo/ Zaitun",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Montero B",
    //    "sku": "122234",
    //    "categoryId": 4,
    //    "color": "Hitam/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Montero T",
    //    "sku": "122235",
    //    "categoryId": 3,
    //    "color": "Coklat Sawo/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Eureka N",
    //    "sku": "122237",
    //    "categoryId": 11,
    //    "color": "Biru Dongker/ Coklat Sawo",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Eureka O",
    //    "sku": "122238",
    //    "categoryId": 10,
    //    "color": "Hitam/ Jingga",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Eureka R",
    //    "sku": "122239",
    //    "categoryId": 9,
    //    "color": "Merah/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Eureka W",
    //    "sku": "122240",
    //    "categoryId": 6,
    //    "color": "Putih/ Biru Dongker",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Eureka B",
    //    "sku": "122241",
    //    "categoryId": 3,
    //    "color": "Hitam/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Eureka B Jr",
    //    "sku": "122242",
    //    "categoryId": 1,
    //    "color": "Hitam/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Veloz N",
    //    "sku": "122243",
    //    "categoryId": 3,
    //    "color": "Putih/ Biru Dongker",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Veloz P",
    //    "sku": "122244",
    //    "categoryId": 2,
    //    "color": "Putih/ Merah Jambu",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Sierra N",
    //    "sku": "122245",
    //    "categoryId": 3,
    //    "color": "Putih/ Biru Dongker",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Sierra R",
    //    "sku": "122246",
    //    "categoryId": 6,
    //    "color": "Putih/ Merah",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Prius N",
    //    "sku": "122247",
    //    "categoryId": 6,
    //    "color": "Putih/ Biru Dongker",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Freed B",
    //    "sku": "122248",
    //    "categoryId": 7,
    //    "color": "Hitam/ Abu arang",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Freed W",
    //    "sku": "122249",
    //    "categoryId": 9,
    //    "color": "Putih/ Putih",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Brio B",
    //    "sku": "122250",
    //    "categoryId": 7,
    //    "color": "Hitam/ Abu arang",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Brio P",
    //    "sku": "122251",
    //    "categoryId": 4,
    //    "color": "Putih/ Merah Jambu",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Brio W",
    //    "sku": "122252",
    //    "categoryId": 3,
    //    "color": "Putih/ Perak",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Zoom B ",
    //    "sku": "122253",
    //    "categoryId": 7,
    //    "color": "Hitam/ Hitam",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //   },{
    //    "name": "Zoom M",
    //    "sku": "122254",
    //    "categoryId": 6,
    //    "color": "Putih/ Merah Marun",
    //    "size": "47",
    //    "gender": "M",
    //    "createdAt": new Date(),
    //    "updatedAt": new Date()
    //  },{
    //   "name": "Zoom N",
    //   "sku": "122255",
    //   "categoryId": 2,
    //   "color": "Putih/ Biru Dongker",
    //   "size": "47",
    //   "gender": "M",
    //   "createdAt": new Date(),
    //   "updatedAt": new Date()
    //  },{
    //   "name": "Xperia B",
    //   "sku": "122256",
    //   "categoryId": 4,
    //   "color": "Hitam/ Hitam",
    //   "size": "47",
    //   "gender": "M",
    //   "createdAt": new Date(),
    //   "updatedAt": new Date()
    //  },{
    //   "name": "Escape W",
    //   "sku": "122221",
    //   "categoryId": 3,
    //   "color": "Putih/ Biru Dongker",
    //   "size": "47",
    //   "gender": "M",
    //   "createdAt": new Date(),
    //   "updatedAt": new Date()
    // }
    //   ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    // return queryInterface.bulkDelete('Items', null, {});
  }
};
