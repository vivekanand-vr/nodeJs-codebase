/**
 * @file logger.config.ts
 * @description 
 * Logger configuration using Winston and DailyRotateFile.
 * Formats logs with timestamps, JSON structure, and correlation IDs.
 * Logs are written to the console and daily rotating log files.
 */

import winston from "winston";
import { getCorrelationId } from "../utils/helpers/request.helpers";
import DailyRotateFile from "winston-daily-rotate-file";

// Create and configure the Winston logger instance
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }), // Timestamp format
    winston.format.json(), // Format logs as JSON
    winston.format.printf(({ level, message, timestamp, ...data }) => {
      const output = {
        level,
        message,
        timestamp,
        correlationId: getCorrelationId(), // Include correlation ID for traceability
        data
      };
      return JSON.stringify(output); // Return formatted log string
    })
  ),
  transports: [
    // Log to console
    new winston.transports.Console(),

    // Log to daily rotating files
    new DailyRotateFile({
      filename: "logs/%DATE%-app.log",   // File name pattern
      datePattern: "YYYY-MM-DD",         // Date format in file name
      maxSize: "20m",                    // Max file size before rotation
      maxFiles: "14d"                    // Keep logs for 14 days
    })

    // TODO: add logic to integrate and save logs in MongoDB
  ]
});

export default logger;
