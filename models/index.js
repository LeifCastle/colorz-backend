require("dotenv").config();
const mongoose = require("mongoose");

// import all models
const User = require("./user");
const Theme = require("./theme");

console.log("mongo uri =>", process.env.MONGO_URI);

// connect to the database
mongoose.connect(process.env.MONGO_URI || "https://localhost:8000", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create connection object
const db = mongoose.connection;

// once the database opens
db.once("open", () => {
  console.log(
    "Connected to MongoDB Database: Mongoose App at HOST: ",
    db.host,
    "PORT: ",
    db.port
  );
});

// if there is a database error
db.on("error", (err) => {
  console.log(`Database error: `, err);
});

module.exports = {
  User,
  Theme,
};
