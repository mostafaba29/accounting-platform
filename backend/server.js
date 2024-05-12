const mongoose = require("mongoose");
const app = require("./app");

process.loadEnvFile("config.env");

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("Connected to database successfully");
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
