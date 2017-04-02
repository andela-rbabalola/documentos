module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Priviledges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      docId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Documents',
          key: 'id',
          as: 'docId'
        }
      },
      canEdit: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: 'none@email.com',
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        }
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
    return queryInterface.dropTable('Priviledges');
  }
};
