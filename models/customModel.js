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
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kota: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        email: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      alamat_workshop: {
        type: DataTypes.STRING,
      },
      alamat_penerima: {
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
  };
  return customer;
};
