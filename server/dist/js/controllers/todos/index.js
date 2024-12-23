"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const todos = yield todo_1.default.find({ user: req.user.id });
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const body = req.body;
        // Validate required fields
        if (!body.name) {
            res.status(400).json({ message: "Name is required" });
            return;
        }
        if (body.description === undefined) {
            res.status(400).json({ message: "Description is required" });
            return;
        }
        if (body.status === undefined) {
            res.status(400).json({ message: "Status is required" });
            return;
        }
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
            user: req.user.id, // Add user ID to the todo
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find({ user: req.user.id });
        res.status(201).json({
            message: "Todo added",
            todo: newTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error adding todo",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { params: { id }, body, } = req;
        // First verify the todo belongs to the user
        const todo = yield todo_1.default.findOne({ _id: id, user: req.user.id });
        if (!todo) {
            res.status(404).json({ message: "Todo not found or unauthorized" });
            return;
        }
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_1.default.find({ user: req.user.id });
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // First verify the todo belongs to the user
        const todo = yield todo_1.default.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            res.status(404).json({ message: "Todo not found or unauthorized" });
            return;
        }
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todo_1.default.find({ user: req.user.id });
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
// import { Response, Request } from "express";
// import { ITodo } from "./../../types/todo";
// import Todo from "../../models/todo";
// const getTodos = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const todos: ITodo[] = await Todo.find();
//     res.status(200).json({ todos });
//   } catch (error) {
//     throw error;
//   }
// };
// const addTodo = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const body = req.body as Pick<ITodo, "name" | "description" | "status">;
//     // Validate required fields
//     if (!body.name) {
//       res.status(400).json({ message: "Name is required" });
//       return;
//     }
//     if (body.description === undefined) {
//       res.status(400).json({ message: "Description is required" });
//       return;
//     }
//     if (body.status === undefined) {
//       res.status(400).json({ message: "Status is required" });
//       return;
//     }
//     const todo: ITodo = new Todo({
//       name: body.name,
//       description: body.description,
//       status: body.status,
//     });
//     const newTodo: ITodo = await todo.save();
//     const allTodos: ITodo[] = await Todo.find();
//     res.status(201).json({
//       message: "Todo added",
//       todo: newTodo,
//       todos: allTodos,
//     });
//   } catch (error) {
//     // Proper error handling
//     console.error(error);
//     res.status(500).json({
//       message: "Error adding todo",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
// const updateTodo = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       params: { id },
//       body,
//     } = req;
//     const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
//       { _id: id },
//       body
//     );
//     const allTodos: ITodo[] = await Todo.find();
//     res.status(200).json({
//       message: "Todo updated",
//       todo: updateTodo,
//       todos: allTodos,
//     });
//   } catch (error) {
//     throw error;
//   }
// };
// const deleteTodo = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
//       req.params.id
//     );
//     const allTodos: ITodo[] = await Todo.find();
//     res.status(200).json({
//       message: "Todo deleted",
//       todo: deletedTodo,
//       todos: allTodos,
//     });
//   } catch (error) {
//     throw error;
//   }
// };
// export { getTodos, addTodo, updateTodo, deleteTodo };
// const addTodo = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>
//         const todo: ITodo = new Todo({
//             name: body.name,
//             description: body.description,
//             status: body.status,
//         })
//         const newTodo: ITodo = await todo.save()
//         const allTodos: ITodo[] = await Todo.find()
//         res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos })
//     } catch (error) {
//         throw error
//     }
// }
