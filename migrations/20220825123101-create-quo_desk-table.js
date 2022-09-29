"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("quo_desk", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      item: {
        type: Sequelize.STRING,
      },
      vol: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      unit: {
        type: Sequelize.STRING,
      },
      quoatation_id: {
        type: Sequelize.UUID,
        references: {
          model: "quoatation",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("quo_desk");
  },
};
