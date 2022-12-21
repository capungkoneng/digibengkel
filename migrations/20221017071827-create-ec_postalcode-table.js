"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("ec_postalcode", {
        postal_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        subdis_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "ec_subdistricts",
            key: "subdis_id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
        city_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "ec_cities",
            key: "city_id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
        postal_code: {
          type: Sequelize.BIGINT,
        },
      })
      .then(() =>
        queryInterface.addIndex("ec_postalcode", [
          "postal_id",
          "prov_id",
          "city_id",
          "dis_id",
          "subdis_id",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ec_postalcode");
  },
};
