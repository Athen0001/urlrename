//import path from "path";
import "dotenv/config"; // Load the environment variables
import express from "express";
import { connectDB } from "./config/database.js";
import urlRoutes from "./routes/urlRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();
//const __dirname = path.resolve();

// database connection
connectDB();

// Middlewares
//app.use(express.static(path.join(__dirname, 'frontend'))); to fix in the future, the static files aren't loading with this method.
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // HTTP headers security.
app.use(cors()); // turn on CORS.
app.use(morgan("tiny")); // Logs of the requisitions.
app.use(express.json()); // Allow JSON in the req body.

// Routes
app.use("/", urlRoutes);

// Middleware for error treatment
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
