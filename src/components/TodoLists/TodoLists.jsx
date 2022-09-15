import { useState, useEffect } from "react";
import TodoList from "../TodoList/TodoList";
import { useTodoListStore } from "../../store/store";
import TodoForm from "../TodoForm/TodoForm";

const TodoLists = () => {
  const [filter, setFilter] = useState("");
  const todoLists = useTodoListStore((state) => state.todoLists);
  const fetchTodoLists = useTodoListStore((state) => state.fetchTodoLists);

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const filterTodoLists = () => {
    let f = filter.trim().toLowerCase();
    return todoLists.filter(
      (list) =>
        list.title.trim().toLowerCase().includes(f) ||
        list.todos.some((t) => t.title.trim().toLowerCase().includes(f))
    );
  };

  const filteredTodoLists = filterTodoLists();

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="w-full mb-4 flex items-center">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          type="text"
          className="w-full input input-bordered min-h-[46px]"
        />
        <svg
          className="btn-square p-3 -ml-12"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="10" cy="10" r="7"></circle>
          <line x1="21" y1="21" x2="15" y2="15"></line>
        </svg>
      </div>
      <div className="p-2 w-full h-full overflow-auto flex flex-col mb-4">
        {filteredTodoLists.map((todoList) => (
          <TodoList key={todoList.id} todoList={todoList} />
        ))}
      </div>
      <TodoForm />
    </div>
  );
};

export default TodoLists;
