/**
 * @file v1/index.router.ts
 * @description 
 * Defines and exports version 1 API routes for the application.
 * Organizes and mounts route modules under specific path prefixes.
 */

import express from 'express';
import pingRouter from './ping.router';

// Create a router instance for API version 1
const v1Router = express.Router();

// Mount the pingRouter on the /ping path
v1Router.use('/ping', pingRouter);

export default v1Router;
