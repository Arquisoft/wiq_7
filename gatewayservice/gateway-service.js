import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import promBundle from 'express-prom-bundle';
// Libraries required for OpenAPI-Swagger
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';
import morgan from 'morgan';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const app = express();
const port = 8000;
dotenv.config();

let originUrl = process.env.ORIGIN_URL || 'http://localhost:3000';
if (process.env.NODE_ENV === 'development') {
  console.log('Using development origin URL');
  originUrl = 'http://localhost:3000';
}

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const questionServiceUrl =
  process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';
const statServiceUrl = process.env.STAT_SERVICE_URL || 'http://localhost:8004';

app.use(
  cors({
    origin: originUrl,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl + '/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

app.get('/logout', async (req, res) => {
  try {
    // Forward the logout request to the authentication service
    const authResponse = await axios.get(authServiceUrl + '/logout');
    res.json(authResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(
      userServiceUrl + '/adduser',
      req.body
    );
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get('/users', async (req, res) => {
  try {
    // Forward the get users request to the user service
    const userResponse = await axios.get(userServiceUrl + '/users');
    res.json(userResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

app.get('/current-user', async (req, res) => {
  try {
    // Forward the get current user request to the user service
    const userResponse = await axios.get(userServiceUrl + '/current-user', {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.json(userResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

app.patch('/update-user', async (req, res) => {
  try {
    // Forward the update user request to the user service
    const userResponse = await axios.patch(
      userServiceUrl + '/update-user',
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.post('/addquestion', async (req, res) => {
  try {
    // Forward the add question request to the question service
    const addQuestionResponse = await axios.post(
      questionServiceUrl + '/addquestion',
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.json(addQuestionResponse.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get('/questions', async (req, res) => {
  try {
    // Forward the get question request to the question asking service
    const getQuestionResponse = await axios.get(
      questionServiceUrl + '/questions'
    );
    res.json(getQuestionResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

app.get('/game1-questions', async (req, res) => {
  try {
    // Forward the game1 question request to the question service
    const getQuestionResponse = await axios.get(
      questionServiceUrl + '/game1-questions',
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.json(getQuestionResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

app.get('/game2-questions', async (req, res) => {
  try {
    // Forward the game2 question request to the question service
    const getQuestionResponse = await axios.get(
      questionServiceUrl + '/game2-questions',
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.json(getQuestionResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

app.post('/addstat', async (req, res) => {
  try {
    // Forward the add stat request to the stat service
    const addStatResponse = await axios.post(
      statServiceUrl + '/addstat',
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.json(addStatResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

app.get('/stats', async (req, res) => {
  try {
    // Forward the get stats request to the stat service
    const getStatsResponse = await axios.get(statServiceUrl + '/stats');
    res.json(getStatsResponse.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
});

// Read the OpenAPI YAML file synchronously
const openapiPath = './openapi.yaml';
if (fs.existsSync(openapiPath)) {
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log('Not configuring OpenAPI. Configuration file not present.');
}

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

export default server;
