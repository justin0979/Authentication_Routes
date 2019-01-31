const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  item: String,
  description: String
});

module.exports = mongoose.model("Material", materialSchema);
