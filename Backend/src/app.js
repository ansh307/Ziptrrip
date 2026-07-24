const express = require('express');
const todoRoutes = require('./routes/todo.routes.js');
const app = express();

app.use(express.json())

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
});

app.use("/api/v1/todo", todoRoutes)

module.exports = app;