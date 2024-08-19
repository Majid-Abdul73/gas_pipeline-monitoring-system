const mongoose = require('mongoose');

const RobotSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lon: Number,
  },
  gasConcentrations: {
    methane: Number,
    propane: Number,
    carbonMonoxide: Number,
    lpg: Number,
  },
  liveVideoStream: String, // URL to the video stream
  manualControl: {
    move: String, // Directions or commands
  },
});

module.exports = mongoose.model('Robot', RobotSchema);
