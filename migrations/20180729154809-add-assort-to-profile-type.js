'use strict';
const replaceEnum = require('sequelize-replace-enum-postgres').default

module.exports = {
  up: function (queryInterface, Sequelize) {
    return replaceEnum({
      queryInterface,
      tableName: 'Profiles',
      columnName: 'type',
      defaultValue: 'solid',
      newValues: ['solid', 'assort', 'mix'],
      enumName: 'enum_Profiles_type'
    })
  },

  down: function (queryInterface, Sequelize) {
    return replaceEnum({
      queryInterface,
      tableName: 'Profiles',
      columnName: 'type',
      defaultValue: 'solid',
      newValues: ['solid', 'mix'],
      enumName: 'enum_Profiles_type'
    })
  }
};
