import { RequestHandler } from "express";
import pool from "../db";
import { TodoValidation } from "../validations";
import { ThrowException } from "../exceptions/throw-exception";
import { TodoServices } from "../services";
import { jsonResponse } from "../utils/response";

class TodosController {
  static getTodo: RequestHandler = async (req, res, next) => {
    const { message, success } = TodoValidation.handleGetTodo(req);
    if (!success) {
      ThrowException.badRequest(message);
    }

    const response = await TodoServices.getTodo(req);
    await jsonResponse(res, response);
  };

  static getTodos: RequestHandler = async (req, res, next) => {
    const response = await TodoServices.getTodos(req);
    await jsonResponse(res, response);
  };

  static addTodo: RequestHandler = async (req, res, next) => {
    const { message, success } = TodoValidation.handleAddTodo(req);
    if (!success) {
      ThrowException.badRequest(message);
    }

    const response = await TodoServices.addTodo(req);
    await jsonResponse(res, response);
  };

  static finishTodo: RequestHandler = async (req, res, next) => {
    const { message, success } = TodoValidation.handleFinishTodo(req);
    if (!success) {
      ThrowException.badRequest(message);
    }

    const response = await TodoServices.finishTodo(req);
    await jsonResponse(res, response);
  };
}

export default TodosController;
