"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("ec_provinces", {
        prov_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        prov_name: {
          type: Sequelize.STRING,
        },
        locationid: {
          type: Sequelize.INTEGER,
        },
        status: {
          type: Sequelize.INTEGER,
        },
      })
      .then(() =>
        queryInterface.addIndex("ec_provinces", ["prov_id", "prov_name"])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ec_provinces");
  },
};
