import { Request } from "express";
import { useJoiVariable, validate } from "../utils/joi";

export class TodoValidation {
  static handleGetTodo(req: Request) {
    return validate({
      params: {
        id: useJoiVariable("number").required(),
      },
    })(req);
  }
  static handleAddTodo(req: Request) {
    return validate({
      body: {
        title: useJoiVariable("text").required(),
        description: useJoiVariable("text").required(),
      },
    })(req);
  }

  static handleFinishTodo(req: Request) {
    return validate({
      params: {
        id: useJoiVariable("number").required(),
      },
    })(req);
  }
}
