 'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a vaild email"}
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    billingAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    billingCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    billingState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    billingZipCode: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here

    User.hasMany(models.Email, {
      foreignKey: "userId",
      as: "emails"
    });

    User.hasMany(models.Child, {
      foreignKey: "userId",
      as: "children"
    });
    
  };
  return User;
};