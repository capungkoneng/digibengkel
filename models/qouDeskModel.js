module.exports = (sequelize, DataTypes) => {
  const quodesk = sequelize.define(
    "quodesk",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      item: {
        type: DataTypes.STRING,
      },
      vol: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      unit: {
        type: DataTypes.STRING,
      },
      quoatation_id: {
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
      tableName: "quo_desk",
    }
  );
  quodesk.associate = (models) => {
    quodesk.belongsTo(models.quo, {
      foreignKey: "id",
      sourceKey: "quoatation_id",
      as: "quodesk"
    });
  };
  return quodesk;
};
