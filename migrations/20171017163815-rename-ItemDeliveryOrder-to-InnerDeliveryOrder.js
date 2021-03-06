'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.renameTable('ItemDeliveryOrders', 'InnerDeliveryOrders')
  },

  down: function (queryInterface, Sequelize) {
    // NOTE: kemarin arnaz kelupaan buat fungsi ini. jadinya harus drop tabel semua ketika mau benerin.
    return queryInterface.renameTable('InnerDeliveryOrders', 'ItemDeliveryOrders')
  }
};
