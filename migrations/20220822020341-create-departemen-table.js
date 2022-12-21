"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("departemen", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        kodedep: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        namadep: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex("departemen", ["id", "kodedep", "namadep"])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("departemen");
  },
};
