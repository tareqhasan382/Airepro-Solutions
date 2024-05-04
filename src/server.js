import express from "express";
import db from "./config/db.js";
import { ProductsRoute } from "./routes/productsRoute.js";
import { SalesRoute } from "./routes/salesRoute.js";
import cron from "node-cron";
const app = express();

const port = 8000;

let server;

async function main() {
  try {
    // Connect to the database
    db.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL database:", err);
        throw err;
      }
      console.log("Database connected successfully!");
    });
    app.use(express.json());
    // Define routes
    app.get("/", (req, res) => {
      res
        .status(200)
        .json({ status: 200, message: "Our server is Running 🚀" });
    });
    app.use("/api/v1", ProductsRoute);
    app.use("/api/v1", SalesRoute);
    // Set up a cron job that runs every hour
    cron.schedule("*/10 * * * * *", () => {
      // Fetch data from an external API
      console.log("running a task every 10 second");
    });

    // Route not found handling
    app.use((req, res, next) => {
      res.status(404).json({
        success: false,
        message: "Not Found",
        errorMessage: [{ path: req.originalUrl, message: "API NOT FOUND!" }],
      });
    });

    // Start server
    server = app.listen(port, () => {
      console.log(`Application app listening on port ${port}`);
    });

    // Handle unhandled rejections
    process.on("unhandledRejection", (error) => {
      console.error("Unhandled Rejection:", error);
      if (server) {
        server.close(() => {
          console.log("Server closed due to unhandled rejection");
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });

    // Handle SIGTERM signal
    process.on("SIGTERM", () => {
      console.log("SIGTERM is received");
      if (server) {
        server.close(() => {
          console.log("Server closed due to SIGTERM signal");
        });
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
