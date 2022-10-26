module.exports = (sequelize, DataTypes) => {
    const emp_pendidikan = sequelize.define(
      "emp_pendidikan",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        jns_pndidikan: {
          type: DataTypes.ENUM({
            values: ["SD", "SMP", "SMA", "D3", "S1"],
          }),
          allowNull: false,
        },
        nama_sekolah: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        thun_lulus: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        emp_id: {
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
        tableName: "emp_pendidikan",
      }
    );
    emp_pendidikan.associate = (models) => {
      emp_pendidikan.belongsTo(models.employe, {
        foreignKey: "id",
        sourceKey: "emp_id",
        as: "emppen",
      });
    };
    return emp_pendidikan;
  };
  