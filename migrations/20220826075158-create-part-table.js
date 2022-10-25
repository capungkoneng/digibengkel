"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("part", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        part_nama: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.ENUM({
            values: ["Rotating Part", "Static Part", "Consumable Part"],
          }),
        },
        equip_id: {
          type: Sequelize.UUID,
          references: {
            model: "equipment",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        upload: {
          type: Sequelize.TEXT,
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
        queryInterface.addIndex("part", [
          "part_nama",
          "description",
          "equip_id",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("part");
  },
};
