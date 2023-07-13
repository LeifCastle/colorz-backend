const mongoose = require('mongoose');

// create the theme schema
const themeSchema = new mongoose.Schema({
  color: String,
  height: String,
  width: String,
  textSize: String,
}, { timestamps: true });

// create model
const Theme = mongoose.model('Theme', themeSchema);

// export the model to be used
module.exports = Theme;
