'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // FIXME: nama constraint diambil dari detail database karena diawal dulu tidak disebutkan namanya
    return queryInterface.removeConstraint('Inners', 'Inners_itemId_fkey')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Inners', ['itemId'], {
      type: 'foreign key',
      name: 'Inners_itemId_fkey',
      references: {
        table: 'Skus',
        field: 'id'
      }
    })
  }
};
