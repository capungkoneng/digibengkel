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
      nik: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      nama_karyawan: {
        type: DataTypes.STRING,
      },
      departement_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
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
      tmptlahir: {
        type: DataTypes.STRING,
      },
      tgllahir: {
        type: DataTypes.DATE(6),
      },
      id_card: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
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
      starjoin: {
        type: DataTypes.DATE(6),
      },
      sisa_cuti: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      spouse_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin_spouse: {
        type: DataTypes.STRING,
      },
      tmpt_lahir_spouse: {
        type: DataTypes.STRING,
      },
      tgllahir_spouse: {
        type: DataTypes.DATE(6),
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
    employe.hasMany(models.employchild, {
      foreignKey: "emp_id_child",
      as: "empchild",
    });
    employe.hasOne(models.departemen, {
      foreignKey: "id",
      sourceKey: "departement_id",
    });
  };
  return employe;
};
