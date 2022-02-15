const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

class Columns extends Model {}

Columns.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  idBoard: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  sequelize, modelName: "columns"
})

module.exports = Columns;