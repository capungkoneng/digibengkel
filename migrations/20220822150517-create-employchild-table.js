"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("employchild", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        emp_id_child: {
          type: Sequelize.UUID,
          references: {
            model: "employe",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        name_child: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        jenis_kelamin: {
          type: Sequelize.ENUM({
            values: ["Laki-Laki", "Perempuan"],
          }),
          allowNull: false,
        },
        tmpt_lahir: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tgllahir: {
          type: Sequelize.DATE,
          allowNull: false,
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
        queryInterface.addIndex("employchild", [
          "id",
          "emp_id_child",
          "name_child",
          "tgllahir",
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employchild");
  },
};
