"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("consuplier", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        contact_person: {
          type: Sequelize.STRING,
        },
        email_person: {
          type: Sequelize.STRING,
          isEmail: true,
        },
        contact_person_telp: {
          type: Sequelize.STRING,
        },
        sup_id: {
          type: Sequelize.UUID,
          references: {
            model: "supplier",
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
      })
      .then(() => {
        return queryInterface.addIndex("consuplier", [
          "contact_person",
          "email_person",
          "contact_person_telp",
          "sup_id",
          "id",
        ]);
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("consuplier");
  },
};
