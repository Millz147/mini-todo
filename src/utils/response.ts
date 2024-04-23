import { Response } from "express";

export const jsonResponse = (res: Response, response: ApiResponse) => {
  return res.status(response.status).json(response);
};
