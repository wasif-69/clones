const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  save_data_group: {
    type: String,
    required: true,
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;