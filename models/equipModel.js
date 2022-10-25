module.exports = (sequelize, DataTypes) => {
  const equipment = sequelize.define(
    "equipment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_equipment:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      equip_nama: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      upload: {
        type: DataTypes.TEXT,
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
      tableName: "equipment",
    }
  );
  equipment.associate = (models) => {
    equipment.hasMany(models.part, {
      foreignKey: "equip_id",
      as: "equipmen",
    });
    equipment.belongsTo(models.wor, {
      foreignKey: "id",
    });
  };
  return equipment;
};
