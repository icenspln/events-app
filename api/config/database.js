const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(`sqlite:${process.env.DATABASE_URI}:`, {});
// const sequelize = new Sequelize(`sqlite::memory:`, {});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (error) {
    console.error("Error: " + "Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
