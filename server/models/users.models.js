const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    lastName: {
      type: Datatypes.STRING,
      allowNull: false
    },
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
      allowNull: false,
      validate: {
        min: 6
      }
    },
    roleId: {
      type: Datatypes.INTEGER,
      defaultValue: 3
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
    instanceMethods: {
        /**
         * Compares plain text password against hashed password
         * @method
         * @param {String} password
         * @returns {Boolean} Validity of passowrd
         */
      verifyPassword(password) {
        console.log('password', this.password);
        return bcrypt.compareSync(password, this.password);
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
