'use strict';

const db = require('../models/index');

// migrasi ini tidak biasa karena postgresql 7 keatas tidak support changeColumn

module.exports = {
  up: function (queryInterface, Sequelize) {
    return db.sequelize.query('ALTER TABLE public."Cartons" ALTER COLUMN "profileId" SET NOT NULL ;')
  },

  down: function (queryInterface, Sequelize) {
    return db.sequelize.query('ALTER TABLE public."Cartons" ALTER COLUMN "profileId" DROP NOT NULL ;')
  }
};
