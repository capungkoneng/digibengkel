module.exports = (sequelize, DataTypes) => {
  const ec_provinces = sequelize.define(
    "ec_provinces",
    {
      prov_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      prov_name: {
        type: DataTypes.STRING,
      },
      locationid: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "ec_provinces",
    }
  );
  ec_provinces.associate = (models) => {
    ec_provinces.hasMany(models.ec_cities, {
      foreignKey: "city_id",
      as: "city",
    });
  };
  return ec_provinces;
};
