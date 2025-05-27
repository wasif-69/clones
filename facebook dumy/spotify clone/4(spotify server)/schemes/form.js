// Import mongoose
const mongoose = require('mongoose');

// Define the schema
const formSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  song: {
    type: String,
    required: true,
    unique: true
  },
  view: {
    type: Boolean,
    required: true
  }
});

// Export the schema
module.exports = mongoose.model('form', formSchema);