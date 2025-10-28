const sequelize = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await User.sync();
  console.log("[DEBUG] model saved");
})();

module.export = User;
