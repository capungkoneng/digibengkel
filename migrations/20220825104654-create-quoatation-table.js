"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("quoatation", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        quo_number: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
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
        address: {
          type: Sequelize.STRING,
        },
        city: {
          type: Sequelize.STRING,
        },
        contact: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        tanggal_quo: {
          type: Sequelize.DATE,
        },
        upload: {
          type: Sequelize.TEXT,
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
        queryInterface.addIndex("quoatation", [
          "quo_number",
          "cus_id",
          "upload",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("quoatation");
  },
};
