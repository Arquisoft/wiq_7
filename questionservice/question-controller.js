const Question = require('./question-model');

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

exports.addQuestionsController = async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, [
      'type',
      'name',
      'path',
      'right',
      'wrong1',
      'wrong2',
      'wrong3',
    ]);

    const newQuestion = new Question({
      type: req.body.type,
      name: req.body.name,
      path: req.body.path,
      right: req.body.right,
      wrong1: req.body.wrong1,
      wrong2: req.body.wrong2,
      wrong3: req.body.wrong3,
    });

    await newQuestion.save();
    res.json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getQuestionsController = async (req, res) => {
  try {
    const questions = await Question.find(); // Fetch all questions
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGameQuestionsController = async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
