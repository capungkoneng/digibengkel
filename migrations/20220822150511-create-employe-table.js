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
        nik: {
          type: Sequelize.STRING,
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
        departement_id: {
          type: Sequelize.UUID,
          references: {
            model: "departemen",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          isEmail: true,
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
        starjoin: {
          type: Sequelize.DATE,
        },
        sisa_cuti: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
        },
        spouse_name: {
          type: Sequelize.STRING,
        },
        jenis_kelamin_spouse: {
          type: Sequelize.STRING,
        },
        tmpt_lahir_spouse: {
          type: Sequelize.STRING,
        },
        tgllahir_spouse: {
          type: Sequelize.DATE,
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
          "nik",
          "nickname",
          "nama_karyawan",
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
