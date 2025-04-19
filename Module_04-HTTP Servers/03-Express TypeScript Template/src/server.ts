/**
 * @file server.ts
 * @description 
 * Main entry point for the Express application.
 * Configures routes, middleware, error handling, and starts the server.
 */

import express from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import v2Router from './routers/v2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * Registering all routers and their corresponding routes with the app server.
 */
app.use(attachCorrelationIdMiddleware);  // Middleware for attaching correlation IDs
app.use('/api/v1', v1Router);  // API v1 routes
app.use('/api/v2', v2Router);  // API v2 routes

/**
 * Error handler middlewares.
 * Catches both custom application errors and generic errors.
 */
app.use(appErrorHandler);
app.use(genericErrorHandler);

// Start the server and listen on the specified port
app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Ctrl+C to stop the server.`);
});