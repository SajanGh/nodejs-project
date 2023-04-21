import { NextFunction, Response } from "express";
import { z } from "zod";

export const validateRequestBody =
  (schema: z.ZodSchema) => (req: any, res: any, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (err: any) {
      return res.status(422).send(err.message);
    }
  };

export const validateRequestParams =
  (schema: z.ZodSchema) => (req: any, res: any, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err: any) {
      return res.staus(422).send(err.message);
    }
  };
