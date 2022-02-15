const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

class Cards extends Model {}

Cards.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  idColumn: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
}, {
  sequelize, modelName: "cards"
})

module.exports = Cards;