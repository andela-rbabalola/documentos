module.exports = (sequelize, Datatypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    },
    text: {
      type: Datatypes.TEXT,
      allowNull: false
    },
    OwnerID: Datatypes.INTEGER,
    access: {
      defaultValue: 'public',
      type: Datatypes.ENUM('public', 'private')
    }
  }, {
    classMethod: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          as: 'Owner',
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });
      }
    }
  });
  return Document;
};
