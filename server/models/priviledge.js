'use strict';

module.exports = function(sequelize, Datatypes) {
  const Priviledge = sequelize.define('Priviledge', {
    canEdit: {
      type: Datatypes.BOOLEAN,
      defaultValue: false
    },
    email: Datatypes.STRING
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
