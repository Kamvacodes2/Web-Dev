import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todo";

// Add type for authenticated request
interface AuthRequest extends Request {
  user?: { id: string }; // Assuming your auth middleware adds user object
}

const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const todos: ITodo[] = await Todo.find({ user: req.user.id });
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

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

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
      user: req.user.id, // Add user ID to the todo
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find({ user: req.user.id });

    res.status(201).json({
      message: "Todo added",
      todo: newTodo,
      todos: allTodos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const {
      params: { id },
      body,
    } = req;

    // First verify the todo belongs to the user
    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    if (!todo) {
      res.status(404).json({ message: "Todo not found or unauthorized" });
      return;
    }

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await Todo.find({ user: req.user.id });
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // First verify the todo belongs to the user
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) {
      res.status(404).json({ message: "Todo not found or unauthorized" });
      return;
    }

    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find({ user: req.user.id });
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };

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
