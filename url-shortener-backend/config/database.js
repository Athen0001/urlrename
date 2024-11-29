import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host (external or local endpoint)
    port: process.env.DB_PORT || 5432, // PostgreSQL port
    dialect: "postgres", // Which database is in use
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfull database connection.");
  } catch (error) {
    console.error("Problems with the database connection:", error);
    process.exit(1);
  }
};

export { sequelize };
