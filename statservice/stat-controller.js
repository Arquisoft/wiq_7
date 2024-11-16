const Stat = require('./stat-model');

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

exports.addStatController = async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, [
      'userId',
      'gameId',
      'questionId',
      'right',
      'time',
      'points',
    ]);

    const newStat = new Stat({
      userId: req.body.userId,
      gameId: req.body.gameId,
      questionId: req.body.questionId,
      right: req.body.right,
      time: req.body.time,
      points: req.body.points,
    });

    await newStat.save();
    res.json(newStat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStatsController = async (req, res) => {
  try {
    const stats = await Stat.find(); // Fetch all questions
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
