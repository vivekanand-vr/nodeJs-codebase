/**
 * @file correlation.middleware.ts
 * @description 
 * Middleware to attach a unique correlation ID to each incoming request.
 * The correlation ID is stored in AsyncLocalStorage for consistent logging and tracing.
 */

import { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { asyncLocalStorage } from '../utils/helpers/request.helpers';

/**
 * Middleware to generate and attach a unique correlation ID to the request.
 * The correlation ID is added to the request headers and stored using AsyncLocalStorage.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction for middleware chaining
 */
export const attachCorrelationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Generate a unique correlation ID
  const correlationId = uuidV4();

  // Attach correlation ID to request headers
  req.headers['x-correlation-id'] = correlationId;

  // Store the correlation ID in AsyncLocalStorage and continue request processing
  asyncLocalStorage.run({ correlationId: correlationId }, () => {
    next();
  });
};
