module.exports = (sequelize, DataTypes) => {
  const address_cus = sequelize.define(
    "address_cus",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.TEXT,
      },
      provinsi: {
        type: DataTypes.STRING,
      },
      kota: {
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
      alamat_workshop: {
        type: DataTypes.STRING,
      },
      alamat_penerima: {
        type: DataTypes.STRING,
      },
      cus_id: {
        type: DataTypes.UUID,
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
      tableName: "address_cus",
    }
  );
  address_cus.associate = (models) => {
    address_cus.belongsTo(models.customer, {
      foreignKey: "id",
      sourceKey: "cus_id",
      as: "addrescus",
    });
  };
  return address_cus;
};
