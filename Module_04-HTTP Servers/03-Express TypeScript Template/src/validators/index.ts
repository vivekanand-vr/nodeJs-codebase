/**
 * @file validators/index.ts
 * @description
 * Reusable Zod-based validation middleware factories for Express routes.
 * Covers request body, query parameters, and route (path) parameters.
 * On validation failure each middleware responds with HTTP 400 and a
 * structured error payload — no further middleware is invoked.
 */

import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import logger from "../config/logger.config";

/**
 * Middleware factory that validates `req.body` against a Zod schema.
 * Typically used on POST / PUT / PATCH routes.
 *
 * @param schema - Zod schema to validate the request body against
 * @returns Express middleware that calls `next()` on success or sends
 *          HTTP 400 with validation errors on failure
 */
export const validateRequestBody = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info("Validating request body");
            await schema.parseAsync(req.body);
            logger.info("Request body is valid");
            next();
        } catch (error) {
            logger.error("Request body validation failed", { error });
            res.status(400).json({
                message: "Invalid request body",
                success: false,
                error: error instanceof ZodError ? error.flatten() : error,
            });
        }
    };
};

/**
 * Middleware factory that validates `req.query` against a Zod schema.
 * Use on routes that rely on query string parameters (e.g. ?page=1&limit=10).
 *
 * @param schema - Zod schema to validate the query parameters against
 * @returns Express middleware that calls `next()` on success or sends
 *          HTTP 400 with validation errors on failure
 */
export const validateQueryParams = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info("Validating query parameters");
            await schema.parseAsync(req.query);
            logger.info("Query parameters are valid");
            next();
        } catch (error) {
            logger.error("Query parameter validation failed", { error });
            res.status(400).json({
                message: "Invalid query parameters",
                success: false,
                error: error instanceof ZodError ? error.flatten() : error,
            });
        }
    };
};

/**
 * Middleware factory that validates `req.params` against a Zod schema.
 * Use on routes with path parameters (e.g. /users/:id).
 *
 * @param schema - Zod schema to validate the route parameters against
 * @returns Express middleware that calls `next()` on success or sends
 *          HTTP 400 with validation errors on failure
 */
export const validateRouteParams = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info("Validating route parameters");
            await schema.parseAsync(req.params);
            logger.info("Route parameters are valid");
            next();
        } catch (error) {
            logger.error("Route parameter validation failed", { error });
            res.status(400).json({
                message: "Invalid route parameters",
                success: false,
                error: error instanceof ZodError ? error.flatten() : error,
            });
        }
    };
};
