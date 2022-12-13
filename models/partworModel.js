module.exports = (sequelize, DataTypes) => {
  const part_wor = sequelize.define(
    "part_wor",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.ENUM({
          values: ["Rotating Part", "Static Part", "Consumable Part"],
        }),
      },
      vol: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      img_url: {
        type: DataTypes.TEXT,
      },
      qty: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      unit: {
        type: DataTypes.STRING,
      },
      wor_id: {
        type: DataTypes.UUID,
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
      tableName: "part_wor",
    }
  );
  part_wor.associate = (models) => {
    part_wor.belongsTo(models.wor, {
      foreignKey: "id",
      sourceKey: "wor_id",
      as: "partwor",
    });
  };
  return part_wor;
};
