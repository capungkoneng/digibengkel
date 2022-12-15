module.exports = (sequelize, DataTypes) => {
  const sr_requesition = sequelize.define(
    "sr_requesition",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      idsr: {
        type: DataTypes.STRING,
      },
      dateofprepared: {
        type: DataTypes.DATE,
      },
      srtype: {
        type: DataTypes.ENUM({
          values: ["job"],
        }),
      },
      references: {
        type: DataTypes.STRING,
      },
      cusname: {
        type: DataTypes.STRING,
      },
      subject: {
        type: DataTypes.TEXT,
      },
      eq: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "sr_requesition",
    }
  );
  sr_requesition.associate = (models) => {
    sr_requesition.hasMany(models.sr_part, {
      foreignKey: "srs_id",
      as: "srpart",
    });
  };
  return sr_requesition;
};
