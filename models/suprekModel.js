module.exports = (sequelize, DataTypes) => {
  const suplier_rek = sequelize.define(
    "suplier_rek",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sup_id: {
        type: DataTypes.UUID,
      },
      koderek: {
        type: DataTypes.STRING,
      },
      namabank: {
        type: DataTypes.STRING,
      },
      namaakun: {
        type: DataTypes.STRING,
      },
      status_rek: {
        type: DataTypes.ENUM({
          values: ["active", "inactive"],
        }),
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
      tableName: "suplier_rek",
    }
  );
  suplier_rek.associate = (models) => {
    suplier_rek.belongsTo(models.supplier, {
      foreignKey: "id",
      sourceKey: "sup_id",
      as: "suprek",
    });
  };
  return suplier_rek;
};
