module.exports = (sequelize, DataTypes) => {
  const quo = sequelize.define(
    "quo",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      quo_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cus_id: {
        type: DataTypes.UUID,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      tanggal_quo: {
        type: DataTypes.DATE,
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
      tableName: "quoatation",
    }
  );
  quo.associate = (models) => {
    quo.hasOne(models.customer, {
      foreignKey: "id",
      sourceKey: "cus_id",
    });
    quo.hasMany(models.quodesk, {
      foreignKey: "quoatation_id",
      as: "quodesk",
    });
    quo.belongsTo(models.wor, {
      foreignKey: "id",
    });
  };
  return quo;
};
