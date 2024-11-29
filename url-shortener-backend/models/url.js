import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Url = sequelize.define(
  "Url",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true, // insert the `createdAt` and `updatedAt` columns
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Url table successful sync");
  })
  .catch((error) => {
    console.error("Table sync error:", error);
  });

export default Url;
