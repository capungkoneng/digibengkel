"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("departemen", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      kodedep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      namadep: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("departemen");
  },
};
