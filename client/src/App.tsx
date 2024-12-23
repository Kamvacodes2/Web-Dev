import React, { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Register from "./components/Register";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./API";

// Assuming you have these interfaces defined elsewhere
interface ITodo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  const fetchTodos = (): void => {
    getTodos()
      .then((response) => setTodos(response.data.todos))
      .catch((err: Error) => console.log(err));
  };

  // const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
  //   addTodo(formData)
  //     .then((response) => {
  //       if (response.status !== 201) {
  //         throw new Error("Error! Todo not saved");
  //       }
  //       setTodos(response.data.todos);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault(); // Prevents default form submission
    addTodo(formData)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(response.data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(response.data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(response.data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  // If not authenticated, show login/register
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {showLogin ? (
          <>
            <Login onLoginSuccess={() => setIsAuthenticated(true)} />
            <p className=" flex-col items-center justify-center min-h-screen">
              Don't have an account?
              <button
                onClick={() => setShowLogin(false)}
                className="ml-2 text-blue-500 hover:underline"
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <Register onRegisterSuccess={() => setIsAuthenticated(true)} />
            <p className="mt-4 center">
              Already have an account?
              <button
                onClick={() => setShowLogin(true)}
                className="ml-2 text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  // If authenticated, show todos
  return (
    <main className="App">
      <div className="flex justify-between items-center p-4">
        <h1>My Todos</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App;

// import React, { useEffect, useState } from "react";
// import TodoItem from "./components/TodoItem";
// import AddTodo from "./components/AddTodo";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import { getTodos, addTodo, updateTodo, deleteTodo } from "./API";

// const App: React.FC = () => {
//   const [todos, setTodos] = useState<ITodo[]>([]);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [showLogin, setShowLogin] = useState<boolean>(true);

//   useEffect(() => {
//     // Check if user is already logged in
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchTodos();
//     }
//   }, [isAuthenticated]);

//   const fetchTodos = (): void => {
//     const token = localStorage.getItem("token");

//     getTodos(token) // Modify your API to accept token
//       .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
//       .catch((err: Error) => console.log(err));
//   };

//   const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
//     const token = localStorage.getItem("token");

//     addTodo(formData, token) // Modify your API to accept token
//       .then(({ status, data }) => {
//         if (status !== 201) {
//           throw new Error("Error! Todo not saved");
//         }
//         setTodos(data.todos);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleUpdateTodo = (todo: ITodo): void => {
//     const token = localStorage.getItem("token");

//     updateTodo(todo, token) // Modify your API to accept token
//       .then(({ status, data }) => {
//         if (status !== 200) {
//           throw new Error("Error! Todo not updated");
//         }
//         setTodos(data.todos);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleDeleteTodo = (_id: string): void => {
//     const token = localStorage.getItem("token");

//     deleteTodo(_id, token) // Modify your API to accept token
//       .then(({ status, data }) => {
//         if (status !== 200) {
//           throw new Error("Error! Todo not deleted");
//         }
//         setTodos(data.todos);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsAuthenticated(false);
//   };

//   // If not authenticated, show login/register
//   if (!isAuthenticated) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         {showLogin ? (
//           <>
//             <Login onLoginSuccess={() => setIsAuthenticated(true)} />
//             <p className="mt-4">
//               Don't have an account?
//               <button
//                 onClick={() => setShowLogin(false)}
//                 className="ml-2 text-blue-500 hover:underline"
//               >
//                 Register
//               </button>
//             </p>
//           </>
//         ) : (
//           <>
//             <Register onRegisterSuccess={() => setIsAuthenticated(true)} />
//             <p className="mt-4">
//               Already have an account?
//               <button
//                 onClick={() => setShowLogin(true)}
//                 className="ml-2 text-blue-500 hover:underline"
//               >
//                 Login
//               </button>
//             </p>
//           </>
//         )}
//       </div>
//     );
//   }

//   // If authenticated, show todos
//   return (
//     <main className="App">
//       <div className="flex justify-between items-center p-4">
//         <h1>My Todos</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//       <AddTodo saveTodo={handleSaveTodo} />
//       {todos.map((todo: ITodo) => (
//         <TodoItem
//           key={todo._id}
//           updateTodo={handleUpdateTodo}
//           deleteTodo={handleDeleteTodo}
//           todo={todo}
//         />
//       ))}
//     </main>
//   );
// };

// export default App;
