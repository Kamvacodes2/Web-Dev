// import { Router } from 'express'
// import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos'

// const router: Router = Router()

// router.get('/todos', getTodos)

// router.post('/add-todo', addTodo)

// router.put('/edit-todo/:id', updateTodo)

// router.delete('/delete-todo/:id', deleteTodo)

// export default router
import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
import authMiddleware from "../middleware/jwt"; // adjust path as needed

const router: Router = Router();

// Apply authMiddleware to all todo routes
router.get("/todos", authMiddleware, getTodos);
router.post("/add-todo", authMiddleware, addTodo);
router.put("/edit-todo/:id", authMiddleware, updateTodo);
router.delete("/delete-todo/:id", authMiddleware, deleteTodo);

export default router;
