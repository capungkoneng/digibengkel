"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("material_name", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      kode_mr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_mr: {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("material_name");
  },
};
