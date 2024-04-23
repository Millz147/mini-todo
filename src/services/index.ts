import { StatusCodes } from "http-status-codes";
import pool from "../db";
import { Request } from "express";
import { ThrowException } from "../exceptions/throw-exception";

export class TodoServices {
  static getTodo = async (req: Request): Promise<ApiResponse> => {
    const client = await pool.connect();
    const { id } = req.params;
    const sql = "SELECT * FROM todos WHERE id = $1";
    const { rows } = await client.query(sql, [id]);
    const todo = rows[0];
    if (!todo) {
      ThrowException.notFound("Todo can not be found.");
    }

    client.release();

    return {
      success: true,
      message: "Success",
      status: StatusCodes.OK,
      data: todo,
    };
  };
  static getTodos = async (req: Request): Promise<ApiResponse> => {
    const client = await pool.connect();

    const sql = "SELECT * FROM todos";
    const { rows } = await client.query(sql);
    const todos = rows;

    client.release();

    return {
      success: true,
      message: "Success",
      status: StatusCodes.OK,
      data: todos,
    };
  };
  static addTodo = async (req: Request): Promise<ApiResponse> => {
    const { title, description } = req.body;
    const client = await pool.connect();
    const sql =
      "INSERT INTO todos (title, description, isFinished) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await client.query(sql, [title, description, false]);
    const todos = rows;

    client.release();

    return {
      success: true,
      message: "Success",
      status: StatusCodes.OK,
      data: todos,
    };
  };

  static finishTodo = async (req: Request): Promise<ApiResponse> => {
    const client = await pool.connect();
    const { id } = req.params;
    const sql = "UPDATE todos SET isFinished = $2 WHERE id = $1";
    const { rows } = await client.query(sql, [id, true]);
    console.log(rows)
    const todo = rows[0];

    client.release();

    return {
      success: true,
      message: "Success",
      status: StatusCodes.OK,
      data: [],
    };
  };
}
