"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("employe", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        NIP: {
          type: Sequelize.BIGINT,
          unique: true,
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        nama_karyawan: {
          type: Sequelize.STRING,
        },
        departement: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          isEmail: true,
        },
        alamat: {
          type: Sequelize.STRING,
        },
        phone: {
          type: Sequelize.STRING,
        },
        tmptlahir: {
          type: Sequelize.STRING,
        },
        tgllahir: {
          type: Sequelize.DATE,
        },
        id_card: {
          type: Sequelize.BIGINT,
          unique: true,
        },
        karyawan_status: {
          type: Sequelize.ENUM({
            values: ["Permanent", "Kontrak"],
          }),
        },
        jenis_kelamin: {
          type: Sequelize.ENUM({
            values: ["Laki-Laki", "Perempuan"],
          }),
        },
        status: {
          type: Sequelize.ENUM({
            values: ["Single", "Married", "Divorce"],
          }),
        },
        kota: {
          type: Sequelize.STRING,
        },
        starjoin: {
          type: Sequelize.DATE,
        },
        sisa_cuti: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
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
        queryInterface.addIndex("employe", [
          "NIP",
          "nickname",
          "nama_karyawan",
          "departement",
          "email",
          "phone",
          "tmptlahir",
          "tgllahir",
          "karyawan_status",
          "jenis_kelamin",
          "status",
          "kota",
          "starjoin",
          "sisa_cuti",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employe");
  },
};
