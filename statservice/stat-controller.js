import Stat from './stat-model.js';

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

export const addStatController = async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, [
      'gameId',
      'questionId',
      'right',
      'time',
      'points',
    ]);

    console.log('addstat');
    console.log(req.user.userId);

    const newStat = new Stat({
      userId: req.user.userId,
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

export const getStatsController = async (req, res) => {
  try {
    const stats = await Stat.find(); // Fetch all questions
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
