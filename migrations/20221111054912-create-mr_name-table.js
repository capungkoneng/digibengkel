"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("mr_nama", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        kd_mrnama: {
          type: Sequelize.STRING,
        },
        nama: {
          type: Sequelize.STRING,
        },
        mr_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "mr_type",
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
        queryInterface.addIndex("mr_nama", [
          "id",
          "kd_mrnama",
          "nama",
          "mr_id",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("mr_nama");
  },
};
