module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      role_name: {
        type: DataTypes.STRING,
        references: {
          model: "departemen",
          key: "namadep",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        email: true,
        allowNull: false,
      },
      phone: {
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
      tableName: "users",
    }
  );
  user.associate = (models) => {
    user.belongsTo(models.session, {
      foreignKey: "id",
    });
    user.hasOne(models.departemen, {
      foreignKey: "namadep",
      sourceKey: "role_name",
    });
  };
  return user;
};
