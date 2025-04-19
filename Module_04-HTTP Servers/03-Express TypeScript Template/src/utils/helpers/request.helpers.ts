/**
 * @file request.helpers.ts
 * @description 
 * Contains helper functions and AsyncLocalStorage configuration for handling 
 * request-specific data such as correlation IDs for logging and tracing.
 */

import { AsyncLocalStorage } from "async_hooks";

// Define the structure for AsyncLocalStorage
type AsyncLocalStorageType = {
  correlationId: string;
};

// Create an instance of AsyncLocalStorage to store correlation ID
export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();

/**
 * Retrieves the correlation ID from AsyncLocalStorage.
 * If no correlation ID is found, a default value is returned.
 *
 * @returns The correlation ID from AsyncLocalStorage, or a default value if not found.
 */
export const getCorrelationId = (): string => {
  const asyncStore = asyncLocalStorage.getStore();
  return asyncStore?.correlationId || 'unknown-error-while-creating-correlation-id'; // Default value if not found
};
