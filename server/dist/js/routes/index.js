"use strict";
// import { Router } from 'express'
// import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router: Router = Router()
// router.get('/todos', getTodos)
// router.post('/add-todo', addTodo)
// router.put('/edit-todo/:id', updateTodo)
// router.delete('/delete-todo/:id', deleteTodo)
// export default router
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const jwt_1 = __importDefault(require("../middleware/jwt")); // adjust path as needed
const router = (0, express_1.Router)();
// Apply authMiddleware to all todo routes
router.get("/todos", jwt_1.default, todos_1.getTodos);
router.post("/add-todo", jwt_1.default, todos_1.addTodo);
router.put("/edit-todo/:id", jwt_1.default, todos_1.updateTodo);
router.delete("/delete-todo/:id", jwt_1.default, todos_1.deleteTodo);
exports.default = router;
