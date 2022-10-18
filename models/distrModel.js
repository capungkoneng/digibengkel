module.exports = (sequelize, DataTypes) => {
  const ec_districts = sequelize.define(
    "ec_districts",
    {
      dis_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dis_name: {
        type: DataTypes.STRING,
      },
      city_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "ec_districts",
    }
  );
  ec_districts.associate = (models) => {
    ec_districts.belongsTo(models.ec_cities, {
      foreignKey: "city_id",
      sourceKey: "city_id",
      as: "distric",
    });
    ec_districts.hasMany(models.ec_subdistricts, {
      foreignKey: "subdis_id",
      as: "subdis",
    });
  };
  return ec_districts;
};
