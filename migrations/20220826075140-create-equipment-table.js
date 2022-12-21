"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("equipment", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        id_equipment: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        equip_nama: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
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
        queryInterface.addIndex("equipment", [
          "id",
          "id_equipment",
          "equip_nama",
          "description",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("equipment");
  },
};
