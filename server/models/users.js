'use strict';

module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    firstName: Datatypes.STRING,
    lastName: Datatypes.STRING,
    email: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: Datatype.STRING,
      validate: {
        min: 6
      }
    },
    RoleId: {
      allowNull: false,
      type: Datatypes.INTEGER
    }
  }, {
      classMethods: {
        associate: (models) => {
          User.hasMany(models.Document, { foreignKey: 'OwnerId' });
          User.belongsTo(models.Role, {
            onDelete: 'CASCADE',
            foreignKey: { allowNull: false }
          })
        }
      }
    });
  return User;
};
