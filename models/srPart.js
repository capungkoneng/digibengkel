module.exports = (sequelize, DataTypes) => {
  const sr_part = sequelize.define(
    "sr_part",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      partitems: {
        type: DataTypes.STRING,
      },
      srdesc: {
        type: DataTypes.TEXT,
      },
      qty: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      unit: {
        type: DataTypes.STRING,
      },
      srs_id: {
        type: DataTypes.UUID,
        references: {
          model: "sr_requesition",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "sr_part",
    }
  );
  sr_part.associate = (models) => {
    sr_part.belongsTo(models.sr_requesition, {
      foreignKey: "id",
      sourceKey: "srs_id",
      as: "srpart",
    });
  };
  return sr_part;
};
