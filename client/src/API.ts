import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000/api";

// Helper function to get headers with authorization token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/todos",
      getAuthHeaders()
    );
    return todos;
  } catch (error: unknown) {
    // Manually check if error has 'response' property
    if ((error as any).response && (error as any).response.status === 401) {
      // Token might be expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload(); // Force redirect to login
    }

    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/add-todo",
      todo,
      getAuthHeaders()
    );
    return saveTodo;
  } catch (error: unknown) {
    // Similar error handling as getTodos
    if ((error as any).response && (error as any).response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }

    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "status"> = {
      status: true,
    };
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate,
      getAuthHeaders()
    );
    return updatedTodo;
  } catch (error: unknown) {
    // Similar error handling as getTodos
    if ((error as any).response && (error as any).response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }

    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`,
      getAuthHeaders()
    );
    return deletedTodo;
  } catch (error: unknown) {
    // Similar error handling as getTodos
    if ((error as any).response && (error as any).response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }

    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// import axios, { AxiosResponse } from "axios";

// const baseUrl: string = "http://localhost:4000";

// export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
//   try {
//     const todos: AxiosResponse<ApiDataType> = await axios.get(
//       baseUrl + "/todos"
//     );
//     return todos;
//   } catch (error) {
//     // Error handling with type check
//     throw new Error(
//       error instanceof Error ? error.message : "An unknown error occurred"
//     );
//   }
// };

// export const addTodo = async (
//   formData: ITodo
// ): Promise<AxiosResponse<ApiDataType>> => {
//   try {
//     const todo: Omit<ITodo, "_id"> = {
//       name: formData.name,
//       description: formData.description,
//       status: false,
//     };
//     const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
//       baseUrl + "/add-todo",
//       todo
//     );
//     return saveTodo;
//   } catch (error) {
//     // Error handling with type check
//     throw new Error(
//       error instanceof Error ? error.message : "An unknown error occurred"
//     );
//   }
// };

// export const updateTodo = async (
//   todo: ITodo
// ): Promise<AxiosResponse<ApiDataType>> => {
//   try {
//     const todoUpdate: Pick<ITodo, "status"> = {
//       status: true,
//     };
//     const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
//       `${baseUrl}/edit-todo/${todo._id}`,
//       todoUpdate
//     );
//     return updatedTodo;
//   } catch (error) {
//     // Error handling with type check
//     throw new Error(
//       error instanceof Error ? error.message : "An unknown error occurred"
//     );
//   }
// };

// export const deleteTodo = async (
//   _id: string
// ): Promise<AxiosResponse<ApiDataType>> => {
//   try {
//     const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
//       `${baseUrl}/delete-todo/${_id}`
//     );
//     return deletedTodo;
//   } catch (error) {
//     // Error handling with type check
//     throw new Error(
//       error instanceof Error ? error.message : "An unknown error occurred"
//     );
//   }
// };

// // import axios, { AxiosResponse } from 'axios'

// // const baseUrl: string = 'http://localhost:4000'

// // export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
// //   try {
// //     const todos: AxiosResponse<ApiDataType> = await axios.get(
// //       baseUrl + '/todos'
// //     )
// //     return todos
// //   } catch (error) {
// //     throw new Error(error)
// //   }
// // }

// // export const addTodo = async (
// //   formData: ITodo
// // ): Promise<AxiosResponse<ApiDataType>> => {
// //   try {
// //     const todo: Omit<ITodo, '_id'> = {
// //       name: formData.name,
// //       description: formData.description,
// //       status: false,
// //     }
// //     const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
// //       baseUrl + '/add-todo',
// //       todo
// //     )
// //     return saveTodo
// //   } catch (error) {
// //     throw new Error(error)
// //   }
// // }

// // export const updateTodo = async (
// //   todo: ITodo
// // ): Promise<AxiosResponse<ApiDataType>> => {
// //   try {
// //     const todoUpdate: Pick<ITodo, 'status'> = {
// //       status: true,
// //     }
// //     const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
// //       `${baseUrl}/edit-todo/${todo._id}`,
// //       todoUpdate
// //     )
// //     return updatedTodo
// //   } catch (error) {
// //     throw new Error(error)
// //   }
// // }

// // export const deleteTodo = async (
// //   _id: string
// // ): Promise<AxiosResponse<ApiDataType>> => {
// //   try {
// //     const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
// //       `${baseUrl}/delete-todo/${_id}`
// //     )
// //     return deletedTodo
// //   } catch (error) {
// //     throw new Error(error)
// //   }
// // }
