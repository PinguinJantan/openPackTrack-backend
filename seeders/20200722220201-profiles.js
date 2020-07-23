"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Profiles",
      [
        {
          type: 'mix',
          mixAmount: 10,
          name: 'Mix 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Profiles", null, {});
  },
};
