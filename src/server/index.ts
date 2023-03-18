import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import initPassport from '../config/passport';
import routes from '../routes/users';
import sessionRoute from '../routes/session.route'

// Instantiate express
const server = express();
//server.use(compression());

// Passport Config
//initPassport(passport);
//server.use(passport.initialize());
//server.use(cors());
server.use(express.json());
server.disable('etag');

// Set up CORS headers
server.use(cors({
  // Allow requests from any origin
  origin: '*',
  // Allow the following headers
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Headers']
}));
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
  next();
});

// Initialize routes middleware
server.use('/api/users', routes);
server.use('/api/sessions', sessionRoute);
server.get('/favicon.ico', (_req, res) => {
    res.status(304).json({ success: true, msg: 'all good 1' });
  });

export default server;