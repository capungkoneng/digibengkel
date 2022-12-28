"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("mr_master", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        mr_type: {
          type: Sequelize.STRING,
        },
        mr_nama: {
          type: Sequelize.STRING,
        },
        nama: {
          type: Sequelize.STRING,
        },
        satuan: {
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
        queryInterface.addIndex("mr_master", [
          "nama",
          "id",
          "mr_nama",
          "mr_type",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("mr_master");
  },
};
