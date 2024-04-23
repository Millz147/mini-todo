import express, { Router } from 'express';
import TodosController from '../controllers';
import { tryCatch } from '../utils/tryCatch';

const router = Router();


router.get("/:id", tryCatch(TodosController.getTodo));
router.get("/", tryCatch(TodosController.getTodos));
router.post("/", tryCatch(TodosController.addTodo));
router.put("/:id", tryCatch(TodosController.finishTodo));

export default router;