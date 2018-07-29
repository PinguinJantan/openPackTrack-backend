'use strict';
const db = require('../models/index');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Profiles', 'count')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Profiles', 'count', {
      type: Sequelize.INTEGER
    })
  }
};
