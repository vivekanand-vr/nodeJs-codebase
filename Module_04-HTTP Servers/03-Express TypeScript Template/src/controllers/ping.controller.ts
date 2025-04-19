/**
 * @file ping.controller.ts
 * @description 
 * Sample controller for handling a simple ping request.
 * Logs the request and responds with a "Pong!" message.
 */

import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";

/**
 * Handles a GET /ping request.
 * Logs the request and returns a simple JSON response.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction for middleware chaining
 */
export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
  logger.info("Ping request received");
  res.status(200).json({ message: "Pong!" });
};