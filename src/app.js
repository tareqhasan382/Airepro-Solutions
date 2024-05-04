import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Our server is Running 🚀" });
});

// Route not found handling
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessage: [{ path: req.originalUrl, message: "API NOT FOUND!" }],
  });
});

export default app;
