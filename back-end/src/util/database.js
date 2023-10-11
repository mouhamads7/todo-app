const Sequelize = require("sequelize");
// require("dotenv").config();

const seq = new Sequelize(
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  process.env.POSTGRES_DB,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);

module.exports = seq;
