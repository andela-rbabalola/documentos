module.exports = function (sequelize, Datatypes) {
  const Priviledge = sequelize.define('Priviledge', {
    canEdit: {
      type: Datatypes.BOOLEAN,
      defaultValue: false
    },
    email: {
      type: Datatypes.STRING,
      defaultValue: 'none@email.com',
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Priviledge.belongsTo(models.Document, {
          foreignKey: 'docId'
        });
      }
    }
  });
  return Priviledge;
};
