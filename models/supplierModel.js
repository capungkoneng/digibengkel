module.exports = (sequelize, DataTypes) => {
  const supplier = sequelize.define(
    "supplier",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_suplier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      npwp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      suplier_type: {
        type: DataTypes.ENUM({
          values: ["Material Suplier", "Services Vendor"],
        }),
      },
      sup_name: {
        type: DataTypes.STRING,
      },
      alamat: {
        type: DataTypes.STRING,
      },
      kota: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      bank_akun: {
        type: DataTypes.STRING,
      },
      akun_name: {
        type: DataTypes.STRING,
      },
      akun_number: {
        type: DataTypes.INTEGER,
      },
      contact_person_sup: {
        type: DataTypes.STRING,
      },
      ppn: {
        type: DataTypes.FLOAT,
      },
      pph: {
        type: DataTypes.FLOAT,
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
      tableName: "supplier",
    }
  );
  supplier.associate = (models) => {
    supplier.hasMany(models.consuplier, {
      foreignKey: "sup_id",
      as: "cuskontak",
    });
  };
  return supplier;
};
