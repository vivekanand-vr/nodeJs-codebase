/**
 * @file ping.router.ts
 * @description 
 * Defines the routes for ping-related endpoints.
 * Includes health checks and a ping route with request validation.
 */

import express from 'express';
import { pingHandler } from '../../controllers/ping.controller';
import { validateRequestBody } from '../../validators';
import { pingSchema } from '../../validators/ping.validator';

const pingRouter = express.Router();

/**
 * GET /
 * Validates request body using pingSchema before handling with pingHandler.
 * TODO: Resolve TypeScript issue for GET request body validation — typically validation is done on POST/PUT.
 */
pingRouter.get('/', validateRequestBody(pingSchema), pingHandler);

/**
 * GET /health
 * Simple health check endpoint.
 */
pingRouter.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export default pingRouter;
