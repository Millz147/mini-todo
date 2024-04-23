import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/response";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  const serverError = "Oops!, Something went wrong, please try again";
  if (!err?.["status"]) {
    console.error(err);
    return jsonResponse(res, {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: serverError,
      data: [],
    });
  } else {
    console.error(err.message);
    return jsonResponse(res, {
      success: false,
      status: err.status,
      message: err.message ?? serverError,
      data: [],
    });
  }
};
