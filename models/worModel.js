module.exports = (sequelize, DataTypes) => {
  const wor = sequelize.define(
    "wor",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      quotation_id_wor: {
        type: DataTypes.UUID,
      },
      nama_cus: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      tgl_wor: {
        type: DataTypes.DATE,
      },
      contact: {
        type: DataTypes.STRING,
      },
      kota: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      subject: {
        type: DataTypes.STRING,
      },
      job_description: {
        type: DataTypes.TEXT,
      },
      contrak_spk: {
        type: DataTypes.STRING,
      },
      nilai_kontrak: {
        type: DataTypes.STRING,
      },
      sales_id_wor: {
        type: DataTypes.UUID,
      },
      priority_stat: {
        type: DataTypes.ENUM({
          values: ["ST", "XT", "XXT", "XT as Req", "XXT as Req"],
        }),
      },
      qty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      unit: {
        type: DataTypes.STRING,
      },
      tgl_order: {
        type: DataTypes.DATE,
      },
      delivery_order: {
        type: DataTypes.DATE,
      },
      ship_address: {
        type: DataTypes.STRING,
      },
      estimasi_hour: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      equip_name: {
        type: DataTypes.STRING,
      },
      mfg: {
        type: DataTypes.STRING,
      },
      Rotasi: {
        type: DataTypes.STRING,
      },
      model: {
        type: DataTypes.STRING,
      },
      power: {
        type: DataTypes.STRING,
      },
      scope_of_work: {
        type: DataTypes.TEXT,
      },
      noted: {
        type: DataTypes.TEXT,
      },
      upload: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      }
    },
    {
      tableName: "wor",
      timestamp: true,
      paranoid: true,
    }
  );
  wor.associate = (models) => {
    wor.hasOne(models.quo, {
      foreignKey: "id",
      sourceKey: "quotation_id_wor",
    });
    wor.hasOne(models.employe, {
      foreignKey: "id",
      sourceKey: "sales_id_wor",
    });
    wor.hasMany(models.part_wor, {
      foreignKey: "wor_id",
      as: "partwor",
    });
  };
  return wor;
};
