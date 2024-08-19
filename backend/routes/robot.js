const express = require('express');
const Robot = require('../models/Robot');
const router = express.Router();

// Update robot data
router.post('/update', async (req, res) => {
  try {
    const { location, gasConcentrations, liveVideoStream, manualControl } = req.body;
    // Update or create robot data
    const robot = await Robot.findOneAndUpdate({}, {
      location,
      gasConcentrations,
      liveVideoStream,
      manualControl
    }, { upsert: true, new: true });
    res.json(robot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
