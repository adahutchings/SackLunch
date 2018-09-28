'use strict';
module.exports = (sequelize, DataTypes) => {
  var mealOrder = sequelize.define('mealOrder', {
    mealOrdered: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dayOrdered: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  mealOrder.associate = function(models) {
    // associations can be defined here

    mealOrder.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    mealOrder.belongsTo(models.Child, {
      foreignKey: "childId",
      onDelete: "CASCADE"
    });

    mealOrder.belongsTo(models.Day, {
      foreignKey: "dayOrdered", 
      onDelete: "CASCADE"
    })

  };
  return mealOrder;
};