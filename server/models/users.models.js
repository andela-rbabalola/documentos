import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    firstName: Datatypes.STRING,
    lastName: Datatypes.STRING,
    email: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Datatypes.STRING,
      validate: {
        min: 6
      }
    },
    roleId: {
      type: Datatypes.INTEGER,
      defaultValue: 2
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          as: 'documents'
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId'
        });
      }
    },
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      },
      beforeUpdate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      }
    }
  });
  return User;
};
