/**
 * @file server.ts
 * @description 
 * Main entry point for the Express application.
 * Configures routes, middleware, error handling, and starts the server.
 */

import express, { Request, Response } from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import v2Router from './routers/v2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies (limit prevents large payload attacks)
app.use(express.json({ limit: '10kb' }));

// Middleware to parse URL-encoded form data (extended: false uses the querystring library)
app.use(express.urlencoded({ extended: false }));

/**
 * Registering all routers and their corresponding routes with the app server.
 */
app.use(attachCorrelationIdMiddleware);  // Middleware for attaching correlation IDs
app.use('/api/v1', v1Router);  // API v1 routes
app.use('/api/v2', v2Router);  // API v2 routes

/**
 * 404 catch-all handler.
 * Catches any request that did not match a registered route.
 * Must be registered AFTER all routers but BEFORE error handlers.
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

/**
 * Error handler middlewares.
 * Catches both custom application errors and generic errors.
 * NOTE: Error-handling middleware must be registered AFTER all routes.
 */
app.use(appErrorHandler);
app.use(genericErrorHandler);

// Start the server and listen on the specified port
const server = app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Ctrl+C to stop the server.`);
});

/**
 * Graceful shutdown handler.
 * Allows in-flight requests to complete before the process exits.
 * SIGTERM is sent by process managers (e.g. Docker, Kubernetes, PM2).
 * SIGINT  is sent by Ctrl+C in the terminal.
 */
function gracefulShutdown(signal: string): void {
  logger.info(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    logger.info('All connections closed. Server shut down.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));