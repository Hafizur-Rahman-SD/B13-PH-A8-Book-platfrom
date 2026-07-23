import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { nextCookies } from 'better-auth/next-js';
import { MongoClient } from 'mongodb';

const globalForMongo = globalThis;

function getMongoClient() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(process.env.MONGODB_URI);
  }

  return globalForMongo._mongoClient;
}

const mongoDb = getMongoClient().db('book-platform');

const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(mongoDb),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders,
  plugins: [nextCookies()],
});
