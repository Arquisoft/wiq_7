import User from './auth-model.js';
import { StatusCodes } from 'http-status-codes';
import { createJWT } from './utils/tokenUtils.js';
import { comparePassword } from './utils/passwordUtils.js';

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

export const loginController = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Origen permitido
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permite credenciales
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, ['username', 'password']);

    const { username, password } = req.body;

    // Buscar el usuario por nombre en la base de datos
    const user = await User.findOne({ username });

    // Verificar que el usuario exista y la contraseña sea correcta
    if (user && (await comparePassword(password, user.password))) {
      // Generar un token JWT
      const token = createJWT({ userId: user._id, role: user.role });
      res
        .status(StatusCodes.OK)
        .json({ token: token, username: username, createdAt: user.createdAt });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
