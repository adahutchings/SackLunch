'use strict';
module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define('Meal', {
    mealOption: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dayOrdered: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Meal.associate = function(models) {
    // associations can be defined here
    Meal.belongsToMany(models.Child, {
      foreignKey: "childId",
      onDelete: "CASCADE"
    });

    Meal.belongsToMany(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  }; 
  return Meal;
};