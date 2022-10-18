"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("address_cus", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      provinsi: {
        type: Sequelize.STRING,
      },
      kota: {
        type: Sequelize.STRING,
      },
      kecamatan: {
        type: Sequelize.STRING,
      },
      kelurahan: {
        type: Sequelize.STRING,
      },
      kodepos: {
        type: Sequelize.FLOAT,
      },
      alamat_workshop: {
        type: Sequelize.STRING,
      },
      alamat_penerima: {
        type: Sequelize.STRING,
      },
      cus_id: {
        type: Sequelize.UUID,
        references: {
          model: "customer",
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
    await queryInterface.dropTable("address_cus");
  },
};
