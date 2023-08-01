const Sequelize = require("sequelize");

const db = require("../util/database");

const todoTable = db.define("todoItems", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = todoTable;
