const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todo", "user", "pass", {
  dialect: "sqlite",
  host: "/Users/avec/Development/Pessoal/NodeJS/BackTrello/database/hardrive/base.sqlite"
});

module.exports = sequelize;