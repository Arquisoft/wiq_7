const bcrypt = require('bcrypt');
const User = require('./user-model');

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

exports.addUserController = async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, ['username', 'password']);

    // Encrypt the password before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    });

    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsersController = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users, only return username field for security
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
