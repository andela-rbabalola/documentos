'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      docContent: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      access: {
        defaultValue: 'public',
        type: Sequelize.ENUM('public', 'private', 'role')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Documents');
  }
};
