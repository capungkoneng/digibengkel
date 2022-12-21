"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("supplier", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        suplier_type: {
          type: Sequelize.ENUM({
            values: ["Material Suplier", "Services Vendor"],
          }),
        },
        id_suplier: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        npwp: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        sup_name: {
          type: Sequelize.STRING,
        },
        alamat: {
          type: Sequelize.STRING,
        },
        kota: {
          type: Sequelize.STRING,
        },
        provinsi: {
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
        phone: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        contact_person_sup: {
          type: Sequelize.STRING,
        },
        ppn: {
          type: Sequelize.FLOAT,
        },
        pph: {
          type: Sequelize.FLOAT,
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
        queryInterface.addIndex("supplier", [
          "id",
          "id_suplier",
          "npwp",
          "sup_name",
          "email",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("supplier");
  },
};
