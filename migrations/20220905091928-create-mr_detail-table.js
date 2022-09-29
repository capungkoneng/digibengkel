"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mr_detail", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      mr_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      references: {
        type: Sequelize.STRING,
      },
      material_name: {
        type: Sequelize.STRING,
      },
      material_size: {
        type: Sequelize.STRING,
      },
      qty: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.0,
      },
      unit: {
        type: Sequelize.STRING,
      },
      remark: {
        type: Sequelize.TEXT,
      },
      mr_id: {
        type: Sequelize.UUID,
        references: {
          model: "mr",
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
    await queryInterface.dropTable("mr_detail");
  },
};
