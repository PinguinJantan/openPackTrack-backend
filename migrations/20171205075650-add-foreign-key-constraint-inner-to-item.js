'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Inners', ['itemId'], {
      type: 'foreign key',
      name: 'Inners_Item_fkey',
      references: {
        table: 'Items',
        field: 'id'
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Inners', 'Inners_Item_fkey')
  }
};
