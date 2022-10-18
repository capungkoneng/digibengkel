"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ec_subdistricts", {
      subdis_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      subdis_name: {
        type: Sequelize.STRING,
      },
      dis_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "ec_districts",
          key: "dis_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ec_subdistricts");
  },
};
