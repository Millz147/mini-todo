import { Request } from "express";
import Joi, { Schema } from "joi";

type SchemaObject = {
  [key: string]: Schema;
};
export const validate =
  (schemas: {
    body?: SchemaObject;
    params?: SchemaObject;
    query?: SchemaObject;
  }) =>
  (req: Request): { success: boolean; message: string } => {
    try {
      const bodyValidationResult = Joi.object(schemas.body).validate(req.body);
      const paramsValidationResult = Joi.object(schemas.params).validate(
        req.params
      );
      const queryValidationResult = Joi.object(schemas.query).validate(
        req.query
      );
      if (
        bodyValidationResult?.error ||
        paramsValidationResult?.error ||
        queryValidationResult?.error
      ) {
        const errors = [
          bodyValidationResult?.error?.message,
          paramsValidationResult?.error?.message,
          queryValidationResult?.error?.message,
        ]
          .filter(Boolean)
          .join(", ")
          .trim();

        return { success: false, message: errors };
      }

      return { success: true, message: "Success" };
    } catch (error) {
      console.error("Error during validation:", error);
      return { success: false, message: "An error occurred during validation" };
    }
  };

export type JoiVariableType =
  | "email"
  | "_id"
  | "text"
  | "password"
  | "number"
  | "arrayOfText"
  | "bool"
export const useJoiVariable = (type: JoiVariableType) => {
  const string = Joi.string().trim();
  const array = Joi.array();
  const number = Joi.number();
  return {
    email: string.email().empty().min(5),
    _id: string.pattern(/^[0-9a-fA-F]{24}$/),
    text: string.empty().min(1),
    password: string.min(8).trim().empty(),
    number: number.min(1),
    arrayOfText: array.items(string.empty().min(1)),
    bool: Joi.boolean(),
  }[type];
};
