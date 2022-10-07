module.exports = (sequelize, DataTypes) => {
  const employe = sequelize.define(
    "employe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      NIP: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nama_karyawan: {
        type: DataTypes.STRING,
      },
      departement_id: {
        type: DataTypes.UUID,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
      },
      alamat: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      tmptlahir: {
        type: DataTypes.STRING,
      },
      tgllahir: {
        type: DataTypes.DATE,
      },
      id_card: {
        type: DataTypes.BIGINT,
      },
      karyawan_status: {
        type: DataTypes.ENUM({
          values: ["Permanent", "Kontrak"],
        }),
      },
      jenis_kelamin: {
        type: DataTypes.ENUM({
          values: ["Laki-laki", "Perempuan"],
        }),
      },
      status: {
        type: DataTypes.ENUM({
          values: ["Single", "Married", "Divorce"],
        }),
      },
      kota: {
        type: DataTypes.STRING,
      },
      starjoin: {
        type: DataTypes.DATE,
      },
      sisa_cuti: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
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
      tableName: "employe",
    }
  );
  employe.associate = (models) => {
    employe.belongsTo(models.wor, {
      foreignKey: "id",
    });
    employe.hasMany(models.emp_pendidikan, {
      foreignKey: "emp_id",
      as: "emppen",
    });
    employe.hasMany(models.emp_pelatihan, {
      foreignKey: "emp_id_pel",
      as: "emppel",
    });
    employe.hasOne(models.departemen, {
      foreignKey: "id",
      sourceKey: "departement_id",
    });
  };
  return employe;
};
