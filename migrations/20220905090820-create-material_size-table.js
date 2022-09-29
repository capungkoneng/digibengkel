"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("material_size", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      kode_mr_size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_mr_size: {
        type: Sequelize.STRING,
      },
      mr_name_head: {
        type: Sequelize.UUID,
        references: {
          model: "material_name",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("material_size");
  },
};
