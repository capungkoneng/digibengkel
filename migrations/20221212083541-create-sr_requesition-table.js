"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sr_requesition", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      idsr: {
        type: Sequelize.STRING,
      },
      dateofprepared: {
        type: Sequelize.DATE,
      },
      srtype: {
        type: Sequelize.ENUM({
          values: ["job"],
        }),
      },
      references: {
        type: Sequelize.STRING,
      },
      cusname: {
        type: Sequelize.STRING,
      },
      subject: {
        type: Sequelize.TEXT,
      },
      eq: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sr_requesition");
  },
};
