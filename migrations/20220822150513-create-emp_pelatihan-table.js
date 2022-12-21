"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("emp_pelatihan", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        jns_pelatihan: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        wktu_selesai: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        ket: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        upload: {
          type: Sequelize.TEXT,
        },
        emp_id_pel: {
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
        queryInterface.addIndex("emp_pelatihan", [
          "id",
          "jns_pelatihan",
          "wktu_selesai",
          "emp_id_pel",
          "ket",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("emp_pelatihan");
  },
};
