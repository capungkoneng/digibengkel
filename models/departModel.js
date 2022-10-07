module.exports = (sequelize, DataTypes) => {
  const departemen = sequelize.define(
    "departemen",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      kodedep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      namadep: {
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
      tableName: "departemen",
    }
  );
  departemen.associate = (models) => {
    departemen.belongsTo(models.employe, {
      foreignKey: "id",
    });
  };
  return departemen;
};
