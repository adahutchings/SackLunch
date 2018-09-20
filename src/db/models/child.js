'use strict';
module.exports = (sequelize, DataTypes) => {
  var Child = sequelize.define('Child', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Child.associate = function(models) {
    // associations can be defined here

    Child.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })

    Child.hasMany(models.Meal, {
      foreignKey: "childId",
      onDelete: "CASCADE"
    })
  };
  return Child;
};