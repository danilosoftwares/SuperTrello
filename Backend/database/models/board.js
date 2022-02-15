const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

class Board extends Model {}

Board.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize, modelName: "board"
})

module.exports = Board;