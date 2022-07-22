import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import { ChakraProvider } from "@chakra-ui/react";
import TodoLists from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import tasklist from "./api/tasklist";
import "./App.css";

const App = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.token ? true : false);

  const fetchTodoLists = async () => {
    const fetchedTodoLists = await tasklist.getTodoLists();
    if (fetchedTodoLists) setTodoLists(fetchedTodoLists);
  };

  const deleteTodoList = async (id) => {
    const deleted = await tasklist.deleteTodoList(id);
    if (deleted) {
      const todoListsWithoutDeleted = todoLists.filter(
        (todoList) => todoList.id !== id
      );
      setTodoLists(todoListsWithoutDeleted);
    }
  };

  const createTodo = async (title) => {
    const todoList = await tasklist.createTodoList(title);
    if (todoList) setTodoLists([...todoLists, todoList]);
  };

  useEffect(() => {
    if (loggedIn) fetchTodoLists();
  }, [loggedIn]);

  console.log(todoLists);

  return (
    <ChakraProvider>
      <div className="App">
        {loggedIn ? (
          <>
            <TodoLists
              todoLists={todoLists}
              deleteTodoList={deleteTodoList}
              fetchTodoLists={fetchTodoLists}
            />
            <TodoForm createTodo={createTodo} />
          </>
        ) : (
          <LoginForm setLoggedIn={setLoggedIn} />
        )}
      </div>
    </ChakraProvider>
  );
};

export default App;
