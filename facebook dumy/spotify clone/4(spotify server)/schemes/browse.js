// Import mongoose
const mongoose = require('mongoose');

// Define the schema
const browseSchema = new mongoose.Schema({
  songname: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true,
  }
});

// Export the schema
module.exports = mongoose.model('browse', browseSchema);