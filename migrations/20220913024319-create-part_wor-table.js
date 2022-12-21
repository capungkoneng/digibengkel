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
        vol: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
        },
        img_url: {
          type: Sequelize.TEXT,
        },
        qty: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
        },
        unit: {
          type: Sequelize.STRING,
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
          "id",
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
