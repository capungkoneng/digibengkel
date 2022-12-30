require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_DATABASE || "bengkel",
    host:
      process.env.DB_HOST ||
      "dbdigibengkel.cfgxkpw7j2vp.ap-northeast-1.rds.amazonaws.com",
    dialect: "postgres",
    port: "5432",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_DATABASE || "bengkel",
    host:
      process.env.DB_HOST ||
      "dbdigibengkel.cfgxkpw7j2vp.ap-northeast-1.rds.amazonaws.com",
    dialect: "postgres",
    port: "5432",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_DATABASE || "bengkel",
    host:
      process.env.DB_HOST ||
      "dbdigibengkel.cfgxkpw7j2vp.ap-northeast-1.rds.amazonaws.com",
    dialect: "postgres",
    port: "5432",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
