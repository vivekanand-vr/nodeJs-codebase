/**
 * @file index.ts
 * @description 
 * This file contains the basic configuration logic for the application server.
 * It loads environment variables from a .env file and exports the server configuration.
 */

import dotenv from 'dotenv';

// Define the type for server configuration
type ServerConfig = {
  PORT: number;
};

/**
 * Loads environment variables from the .env file using dotenv.
 * Logs a message when environment variables are loaded.
 */
function loadEnv(): void {
  dotenv.config();
  console.log('✅ Environment variables loaded');
}

// Load environment variables at module load time
loadEnv();

/**
 * Server configuration object containing environment-dependent settings.
 * - PORT: Port on which the server will run, defaults to 3001 if not specified.
 */
export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
};
