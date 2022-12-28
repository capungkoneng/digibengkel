module.exports = (sequelize, DataTypes) => {
  const mr_type = sequelize.define(
    "mr_type",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kd_mrtype: {
        type: DataTypes.STRING,
      },
      nama: {
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
      tableName: "mr_type",
    }
  );
  mr_type.associate = (models) => {
    mr_type.hasMany(models.mr_nama, {
      foreignKey: "mr_id",
      as: "mr",
    });
  };
  return mr_type;
};
