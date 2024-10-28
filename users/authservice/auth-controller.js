const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./auth-model.js');

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

exports.loginController = async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, ['username', 'password']);

    const { username, password } = req.body;

    // Buscar el usuario por nombre en la base de datos
    const user = await User.findOne({ username });

    // Verificar que el usuario exista y la contraseña sea correcta
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generar un token JWT
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h',
      });

      // Responder con el token y la información del usuario
      res.json({ username, createdAt: user.createdAt });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
