"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("part_wor", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        nama: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.ENUM({
            values: ["Rotating Part", "Static Part", "Consumable Part"],
          }),
        },
        wor_id: {
          type: Sequelize.UUID,
          references: {
            model: "wor",
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
      })
      .then(() =>
        queryInterface.addIndex("part_wor", [
          "nama",
          "description",
          "wor_id",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("part_wor");
  },
};
