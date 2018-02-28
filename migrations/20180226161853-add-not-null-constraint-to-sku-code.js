'use strict';

const db = require('../models/index');

// migrasi ini tidak biasa karena postgresql 7 keatas tidak support changeColumn

module.exports = {
  up: function (queryInterface, Sequelize) {
    return db.sequelize.query('ALTER TABLE public."Skus" ALTER COLUMN code SET NOT NULL ;')
  },

  down: function (queryInterface, Sequelize) {
    return db.sequelize.query('ALTER TABLE public."Skus" ALTER COLUMN code DROP NOT NULL ;')
  }
};
