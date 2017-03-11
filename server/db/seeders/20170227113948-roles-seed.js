module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      title: 'SuperAdmin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Guest',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};
