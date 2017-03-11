const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Rotimi',
        lastName: 'Babalola',
        email: 'rotimi@gmail.com',
        password: bcrypt.hashSync('rotimi123', bcrypt.genSaltSync(10)),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};
