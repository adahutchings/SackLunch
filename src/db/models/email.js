'use strict';
module.exports = (sequelize, DataTypes) => {
  var Email = sequelize.define('Email', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Email.associate = function(models) {
    // associations can be defined here

    Email.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return Email;
};