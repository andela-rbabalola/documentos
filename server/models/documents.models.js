module.exports = (sequelize, Datatypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: Datatypes.STRING,
      unique: false,
      allowNull: false
    },
    docContent: {
      type: Datatypes.TEXT,
      allowNull: true
    },
    access: {
      defaultValue: 'public',
      type: Datatypes.ENUM('public', 'private', 'role')
    }
  }, {
    classMethod: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          as: 'user',
          onDelete: 'CASCADE',
          foreignKey: 'userId'
        });
      }
    }
  });
  return Document;
};
