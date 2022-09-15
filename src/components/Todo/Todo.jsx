import { useState, useEffect, useRef } from "react";
import { useTodoListStore } from "../../store/store";

const Todo = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const editTodo = useTodoListStore((state) => state.editTodo);
  const deleteTodo = useTodoListStore((state) => state.deleteTodo);
  const setDraggedTodo = useTodoListStore((state) => state.setDraggedTodo);

  const titleInputRef = useRef();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && editing) handleEdit();
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  });

  useEffect(() => {
    if (editing && titleInputRef.current) {
      titleInputRef.current.focus();
      setEditedTitle(todo.title);
    }
  }, [editing]);

  const handleEdit = () => {
    editTodo({ ...todo, title: editedTitle });
    setEditing(false);
  };

  return (
    <div
      className="rounded-lg p-3 ml-auto hover:bg-slate-800 cursor-pointer my-2 flex items-center"
      draggable={!editing}
      onDragStart={() => setDraggedTodo(todo)}
    >
      <input
        checked={todo.completed}
        onChange={() => editTodo({ ...todo, completed: !todo.completed })}
        type="checkbox"
        className="checkbox checkbox-primary mr-3"
      />
      {editing ? (
        <input
          ref={titleInputRef}
          value={editedTitle}
          onBlur={() => handleEdit()}
          onChange={(e) => setEditedTitle(e.target.value)}
          class="input input-bordered w-full mr-2 h-8"
        />
      ) : (
        <span>{todo.title}</span>
      )}
      <div className="ml-auto flex items-center">
        <button
          onClick={() => setEditing(!editing)}
          className="hover:bg-slate-700 flex items-center justify-center btn-square btn-sm rounded-md"
        >
          <svg
            className="inline-block h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>
          </svg>
        </button>
        <button
          onClick={() => deleteTodo(todo)}
          className="hover:bg-slate-700 flex items-center justify-center btn-square btn-sm rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: 20, width: 20 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Todo;
