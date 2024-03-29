"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("mr_type", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        kd_mrtype: {
          type: Sequelize.STRING,
        },
        nama: {
          type: Sequelize.STRING,
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
        queryInterface.addIndex("mr_type", ["id", "kd_mrtype", "nama"])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("mr_type");
  },
};
