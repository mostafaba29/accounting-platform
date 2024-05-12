const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
