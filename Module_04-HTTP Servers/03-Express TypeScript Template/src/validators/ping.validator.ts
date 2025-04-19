/**
 * @file ping.validator.ts
 * @description 
 * Defines the schema for validating ping request bodies using Zod.
 * Ensures that the "message" field is a non-empty string.
 */

import { z } from "zod";

// Define the schema for validating the ping request body
export const pingSchema = z.object({
  message: z.string().min(1) // Ensure "message" is a non-empty string
});
