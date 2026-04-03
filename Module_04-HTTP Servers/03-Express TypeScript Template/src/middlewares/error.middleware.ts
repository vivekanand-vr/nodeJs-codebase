/**
 * @file error.middleware.ts
 * @description 
 * Global error handling middleware for handling both application-specific and generic errors.
 */

import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";
import logger from "../config/logger.config";

/**
 * Handles known application-specific errors.
 * Sends a structured error response with the provided status code and message.
 *
 * @param err - Custom AppError instance
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction for middleware chaining
 */
export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`[AppError] ${err.statusCode} - ${err.message}`, { name: err.name, stack: err.stack });

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};

/**
 * Handles generic or unhandled errors.
 * Sends a generic 500 Internal Server Error response.
 *
 * @param err - Standard Error object
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction for middleware chaining
 */
export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`[UnhandledError] ${err.message}`, { name: err.name, stack: err.stack });

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};
