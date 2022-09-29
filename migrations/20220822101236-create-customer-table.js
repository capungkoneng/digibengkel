"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("customer", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        id_customer: {
          type: Sequelize.STRING,
          unique: true,
        },
        nama: {
          type: Sequelize.STRING,
        },
        alamat: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        kota: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          email: true,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
        },
        alamat_workshop: {
          type: Sequelize.STRING,
        },
        alamat_penerima: {
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
      .then(() => {
        return queryInterface.addIndex("customer", [
          "id_customer",
          "nama",
          "alamat",
          "kota",
          "email",
          "phone",
          "alamat_penerima",
          "alamat_workshop",
        ]);
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customer");
  },
};
