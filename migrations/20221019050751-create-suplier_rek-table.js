"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("suplier_rek", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        sup_id: {
          type: Sequelize.UUID,
          references: {
            model: "supplier",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        koderek: {
          type: Sequelize.STRING,
        },
        namabank: {
          type: Sequelize.STRING,
        },
        namaakun: {
          type: Sequelize.STRING,
        },
        status_rek: Sequelize.ENUM({
          values: ["active", "inactive"],
        }),
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
        queryInterface.addIndex("suplier_rek", [
          "id",
          "sup_id",
          "koderek",
          "namaakun",
          "namabank",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("suplier_rek");
  },
};
