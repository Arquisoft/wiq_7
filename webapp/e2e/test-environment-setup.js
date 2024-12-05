import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoserver;
let userservice;
let authservice;
let gatewayservice;

async function startServer() {
  console.log('Starting MongoDB memory server...');
  mongoserver = await MongoMemoryServer.create();
  const mongoUri = mongoserver.getUri();
  process.env.MONGODB_URI = mongoUri;

  userservice = (await import('../../users/userservice/user-service')).default;
  authservice = (await import('../../users/authservice/auth-service')).default;
  gatewayservice = (await import('../../gatewayservice/gateway-service'))
    .default;
}

startServer();
