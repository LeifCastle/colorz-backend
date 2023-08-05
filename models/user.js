const mongoose = require("mongoose");

// create the element schema
const elementSchema = new mongoose.Schema(
  {
    type: String,
    name: String,
    xPosition: Number,
    yPosition: Number,
    width: String,
    height: String,
    backgroundColor: String,
    fontColor: String,
  },
  { timestamps: true }
);

// create the theme schema
const themeSchema = new mongoose.Schema(
  {
    name: String,
    backgroundColor: String,
    elements: [elementSchema],
  },
  { timestamps: true }
);

//--User Schema (embeded themeSchema)
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    themes: [themeSchema],
  },
  { timestamps: true }
);

//--Create User model
const User = mongoose.model("User", userSchema);

//--Export User model
module.exports = User;
