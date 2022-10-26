module.exports = (sequelize, DataTypes) => {
    const emp_pelatihan = sequelize.define(
      "emp_pelatihan",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        jns_pelatihan: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        wktu_selesai: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ket: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        upload: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        emp_id_pel: {
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
        tableName: "emp_pelatihan",
      }
    );
    emp_pelatihan.associate = (models) => {
      emp_pelatihan.belongsTo(models.employe, {
        foreignKey: "id",
        sourceKey: "emp_id_pel",
        as: "emppel",
      });
    };
    return emp_pelatihan;
  };
  