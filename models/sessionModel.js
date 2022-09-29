module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    "session",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ip_address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_bloked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      acces_token: {
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.STRING,
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
      tableName: "sessions",
    }
  );
  session.associate = (models) => {
    session.hasOne(models.user, {
      foreignKey: "id",
      sourceKey: "user_id",
    });
  };
  return session;
};
