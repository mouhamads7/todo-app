const Sequelize = require("sequelize");

const seq = new Sequelize(
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  process.env.POSTGRES_DB,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);

module.exports = seq;
