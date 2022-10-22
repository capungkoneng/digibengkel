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
      provinsi: {
        type: DataTypes.STRING,
      },
      kecamatan: {
        type: DataTypes.STRING,
      },
      kelurahan: {
        type: DataTypes.STRING,
      },
      kodepos: {
        type: DataTypes.FLOAT,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    supplier.hasMany(models.suplier_rek, {
      foreignKey: "sup_id",
      as: "suprek",
    });
  };
  return supplier;
};
