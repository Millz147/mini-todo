import { NextFunction, Request, RequestHandler, Response } from "express";

export const tryCatch =
  (controller: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller(req, res, next);
      return response;
    } catch (error) {
      next(error);
    }
  };
