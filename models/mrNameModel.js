module.exports = (sequelize, DataTypes) => {
  const mr_nama = sequelize.define(
    "mr_nama",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kd_mrnama: {
        type: DataTypes.STRING,
      },
      nama: {
        type: DataTypes.STRING,
      },
      mr_id: {
        type: DataTypes.INTEGER,
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
      tableName: "mr_nama",
    }
  );
  mr_nama.associate = (models) => {
    mr_nama.belongsTo(models.mr_type, {
      foreignKey: "id",
      sourceKey: "mr_id",
      as: "mr",
    });
  };
  return mr_nama;
};
