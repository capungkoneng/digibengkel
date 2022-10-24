module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    "customer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_customer: {
        type: DataTypes.STRING,
        unique: true,
      },
      nama: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        email: true,
        allowNull: false,
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
      tableName: "customer",
    }
  );
  customer.associate = (models) => {
    customer.belongsTo(models.quo, {
      foreignKey: "id",
    });
    customer.hasMany(models.cus_kontak, {
      foreignKey: "customer_id",
      as: "cuskontak",
    });
    customer.hasMany(models.address_cus, {
      foreignKey: "cus_id",
      as: "addrescus",
    });
  };
  return customer;
};
