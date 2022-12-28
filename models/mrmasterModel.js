module.exports = (sequelize, DataTypes) => {
  const mr_master = sequelize.define(
    "mr_master",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      mr_type: {
        type: DataTypes.STRING,
      },
      mr_nama: {
        type: DataTypes.STRING,
      },
      nama: {
        type: DataTypes.STRING,
      },
      satuan: {
        type: DataTypes.STRING,
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
      tableName: "mr_master",
    }
  );

  return mr_master;
};
