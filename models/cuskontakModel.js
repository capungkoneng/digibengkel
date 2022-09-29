module.exports = (sequelize, DataTypes) => {
  const cus_kontak = sequelize.define(
    "cus_kontak",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      contact_person: {
        type: DataTypes.STRING,
      },
      email_person: {
        type: DataTypes.STRING,
        isEmail: true,
      },
      contact_person_telp: {
        type: DataTypes.STRING,
      },
      customer_id: {
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
      tableName: "cus_kontak",
    }
  );
  cus_kontak.associate = (models) => {
    cus_kontak.belongsTo(models.customer, {
      foreignKey: "id",
      sourceKey: "customer_id",
      as: "cuskontak",
    });
  };
  return cus_kontak;
};
