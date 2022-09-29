module.exports = (sequelize, DataTypes) => {
  const part = sequelize.define(
    "part",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      part_nama: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.ENUM({
          values: ["Rotating Part", "Static Part", "Consumable Part"],
        }),
      },
      equip_id: {
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
      tableName: "part",
    }
  );
  part.associate = (models) => {
    part.belongsTo(models.equipment, {
      foreignKey: "id",
      sourceKey: "equip_id",
      as: "equipmen",
    });
  };
  return part;
};
