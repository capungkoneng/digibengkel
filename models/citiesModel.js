module.exports = (sequelize, DataTypes) => {
  const ec_cities = sequelize.define(
    "ec_cities",
    {
      city_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city_name: {
        type: DataTypes.STRING,
      },
      prov_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "ec_cities",
    }
  );
  ec_cities.associate = (models) => {
    ec_cities.belongsTo(models.ec_provinces, {
      foreignKey: "prov_id",
      sourceKey: "prov_id",
      as: "city",
    });
    ec_cities.hasMany(models.ec_districts, {
      foreignKey: "dis_id",
      as: "distric",
    });
  };
  return ec_cities;
};
