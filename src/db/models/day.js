'use strict';
module.exports = (sequelize, DataTypes) => {
  var Day = sequelize.define('Day', {
    date: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    mealOne: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    mealOneDesc: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    mealTwo: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    mealTwoDesc: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mealThree: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    mealThreeDesc: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Day.associate = function(models) {
    // associations can be defined here

    Day.hasMany(models.mealOrder, {
      foreignKey: "dayOrdered",
      as: "mealOrders"
    })
  };
  return Day;
};