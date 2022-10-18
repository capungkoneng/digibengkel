module.exports = (sequelize, DataTypes) => {
  const ec_subdistricts = sequelize.define(
    "ec_subdistricts",
    {
      subdis_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      subdis_name: {
        type: DataTypes.STRING,
      },
      dis_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "ec_subdistricts",
    }
  );
  ec_subdistricts.associate = (models) => {
    ec_subdistricts.belongsTo(models.ec_districts, {
      foreignKey: "dis_id",
      sourceKey: "ec_districts",
      as: "subdis",
    });
  };
  return ec_subdistricts;
};
