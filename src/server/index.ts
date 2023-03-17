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
server.use(compression());

// Passport Config
initPassport(passport);
server.use(passport.initialize());
server.use(cors());
server.use(express.json());
// Initialize routes middleware
server.use('/api/users', routes);
server.use('/api/sessions', sessionRoute);
server.get('/favicon.ico', (_req, res) => {
    res.status(200).json({ success: true, msg: 'all good 1' });
  });

export default server;