module.exports = (sequelize, DataTypes) => {
  const employchild = sequelize.define(
    "employchild",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      emp_id_child: {
        type: DataTypes.UUID,
      },
      name_child: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM({
          values: ["Laki-laki", "Perempuan"],
        }),
        allowNull: false,
      },
      tmpt_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tgllahir: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "employchild",
    }
  );
  employchild.associate = (models) => {
    employchild.belongsTo(models.employe, {
      foreignKey: "id",
      sourceKey: "emp_id_child",
      as: "empchild",
    });
  };
  return employchild;
};
