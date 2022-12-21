"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface
      .createTable("sr_part", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        partitems: {
          type: Sequelize.STRING,
        },
        srdesc: {
          type: Sequelize.TEXT,
        },
        qty: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
        },
        unit: {
          type: Sequelize.STRING,
        },
        srs_id: {
          type: Sequelize.UUID,
          references: {
            model: "sr_requesition",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
      .then(() => queryInterface.addIndex("sr_part", ["id", "partitems"]));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sr_part");
  },
};
