const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  image: {
    type: String, // Store the file path or URL
    required: true,
  },
});

module.exports = mongoose.model('Sponsor', sponsorSchema);
