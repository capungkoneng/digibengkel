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
          allowNull: false,
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
          allowNull: false,
        },
        kota: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        provinsi: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        kecamatan: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        kelurahan: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        kodepos: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tmptlahir: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tgllahir: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        id_card: {
          type: Sequelize.BIGINT,
          unique: true,
          allowNull: false,
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
          allowNull: false,
        },
        jenis_kelamin_spouse: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tmpt_lahir_spouse: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tgllahir_spouse: {
          type: Sequelize.DATE,
          allowNull: false,
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
          "id",
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
          "id_card",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employe");
  },
};
