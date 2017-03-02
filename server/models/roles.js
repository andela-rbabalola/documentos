module.exports = (sequelize, Datatypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users'
        });
        Role.belongsToMany(models.Priviledge, {
          through: 'DocPriviledge',
          foreignKey: 'roleId',
          as: 'roles'
        });
      }
    }
  });
  return Role;
};
