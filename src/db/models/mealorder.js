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
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  mealOrder.associate = function(models) {
    // associations can be defined here

    mealOrder.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    mealOrder.belongsTo(model.Child, {
      foreignKey: "childId",
      onDelete: "CASCADE"
    });

    mealOrder.belongsTo(model.Day, {
      foreignKey: "date", //might be date??
      onDelete: "CASCADE"
    })

  };
  return mealOrder;
};