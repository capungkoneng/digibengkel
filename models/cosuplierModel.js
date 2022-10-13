module.exports = (sequelize, DataTypes) => {
  const consuplier = sequelize.define(
    "consuplier",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      contact_person: {
        type: DataTypes.STRING,
      },
      email_person: {
        type: DataTypes.STRING,
        isEmail: true,
      },
      contact_person_telp: {
        type: DataTypes.STRING,
      },
      sup_id: {
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
      tableName: "consuplier",
    }
  );
  consuplier.associate = (models) => {
    consuplier.belongsTo(models.supplier, {
      foreignKey: "id",
      sourceKey: "sup_id",
      as: "cosup",
    });
  };
  return consuplier;
};
