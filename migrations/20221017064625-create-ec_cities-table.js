"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("ec_cities", {
        city_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        city_name: {
          type: Sequelize.STRING,
        },
        prov_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "ec_provinces",
            key: "prov_id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      })
      .then(() =>
        queryInterface.addIndex("ec_cities", [
          "city_id",
          "city_name",
          "prov_id",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ec_cities");
  },
};
