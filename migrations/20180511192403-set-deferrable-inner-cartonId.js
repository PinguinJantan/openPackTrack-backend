'use strict';
const db = require('../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return db.sequelize.query('ALTER TABLE public."Inners" ALTER CONSTRAINT "Inners_cartonId_fkey" DEFERRABLE ')
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return db.sequelize.query('ALTER TABLE public."Inners" ALTER CONSTRAINT "Inners_cartonId_fkey" NOT DEFERRABLE')
  }
};
