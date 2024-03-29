"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("emp_pendidikan", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        jns_pndidikan: {
          type: Sequelize.ENUM({
            values: ["SD", "SMP", "SMA", "D3", "S1"],
          }),
        },
        nama_sekolah: {
          type: Sequelize.STRING,
        },
        thun_lulus: {
          type: Sequelize.DATE,
        },
        emp_id: {
          type: Sequelize.UUID,
          references: {
            model: "employe",
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
        queryInterface.addIndex("emp_pendidikan", [
          "id",
          "jns_pndidikan",
          "nama_sekolah",
          "thun_lulus",
          "emp_id",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("emp_pendidikan");
  },
};
