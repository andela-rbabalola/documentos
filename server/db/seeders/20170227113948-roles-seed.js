'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      title: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};
