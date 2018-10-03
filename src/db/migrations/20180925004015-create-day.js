'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Days', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mealOne: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mealOneDesc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mealTwo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mealTwoDesc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mealThree: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mealThreeDesc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Days');
  }
};