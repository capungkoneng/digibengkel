"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ec_districts", {
      dis_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dis_name: {
        type: Sequelize.STRING,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ec_districts");
  },
};
