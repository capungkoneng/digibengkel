"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("wor", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        job: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        quotation_id_wor: {
          type: Sequelize.UUID,
          references: {
            model: "quoatation",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        nama_cus: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        tgl_wor: {
          type: Sequelize.DATE,
        },
        contact: {
          type: Sequelize.STRING,
        },
        kota: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        subject: {
          type: Sequelize.STRING,
        },
        job_description: {
          type: Sequelize.TEXT,
        },
        contrak_spk: {
          type: Sequelize.STRING,
        },
        nilai_kontrak: {
          type: Sequelize.STRING,
        },
        sales_id_wor: {
          type: Sequelize.UUID,
          references: {
            model: "employe",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        priority_stat: {
          type: Sequelize.ENUM({
            values: ["ST", "XT", "XXT", "XT as Req", "XXT as Req"],
          }),
        },
        qty: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
        },
        unit: {
          type: Sequelize.STRING,
        },
        tgl_order: {
          type: Sequelize.DATE,
        },
        delivery_order: {
          type: Sequelize.DATE,
        },
        ship_address: {
          type: Sequelize.STRING,
        },
        estimasi_hour: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
        },
        equip_name: {
          type: Sequelize.STRING,
        },
        mfg: {
          type: Sequelize.STRING,
        },
        Rotasi: {
          type: Sequelize.STRING,
        },
        model: {
          type: Sequelize.STRING,
        },
        power: {
          type: Sequelize.STRING,
        },
        scope_of_work: {
          type: Sequelize.TEXT,
        },
        noted: {
          type: Sequelize.TEXT,
        },
        upload: {
          type: Sequelize.TEXT,
        },
        status: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex("wor", [
          "job",
          "quotation_id_wor",
          "sales_id_wor",
          "upload",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("wor");
  },
};
