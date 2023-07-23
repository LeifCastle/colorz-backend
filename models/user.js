const mongoose = require("mongoose");

//--Element Schema
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

//--User Schema (embeded themeSchema)
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    themes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theme",
      },
    ],
  },
  { timestamps: true }
);

//--Create User model
const User = mongoose.model("User", userSchema);

//--Export User model
module.exports = User;
