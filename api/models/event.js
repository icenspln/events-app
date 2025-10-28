const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Event = sequelize.define("event", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  date: DataTypes.DATE,
  duration: DataTypes.DATE,
  photos: DataTypes.ARRAY.STRING,
});
