"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("users", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        role_name: {
          type: Sequelize.STRING,
          references: {
            model: "departemen",
            key: "namadep",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          email: true,
          allowNull: false,
        },
        phone: {
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
      })
      .then(() =>
        queryInterface.addIndex("users", [
          "id",
          "role_name",
          "username",
          "email",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
