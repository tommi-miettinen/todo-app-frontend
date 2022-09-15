import { useEffect, useState, useRef } from "react";
import Todo from "../Todo/Todo";
import { useTodoListStore } from "../../store/store";

const TodoList = ({ todoList }) => {
  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoListTitle, setTodoListTitle] = useState(todoList.title);
  const [adding, setAdding] = useState(false);

  const deleteTodoList = useTodoListStore((state) => state.deleteTodoList);
  const createTodo = useTodoListStore((state) => state.createTodo);
  const editTodoList = useTodoListStore((state) => state.editTodoList);
  //prettier-ignore
  const moveDraggedTodoTo = useTodoListStore(state => state.moveDraggedTodoTo)
  const createTodoList = useTodoListStore((state) => state.createTodoList);
  //prettier-ignore
  const toggleTodoListAndTodosComplete = useTodoListStore(state => state.toggleTodoListAndTodosComplete)

  const titleRef = useRef();
  const addTodoInputRef = useRef();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.key === "Enter" &&
        document.activeElement === addTodoInputRef.current
      )
        addTodo();
      if (editing && e.key === "Enter") handleEditTodoList();
    };

    const handleClick = (e) => {
      if (editing && document.activeElement !== titleRef.current)
        handleEditTodoList();
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("click", handleClick);
    };
  });

  useEffect(() => {
    if (adding && addTodoInputRef.current) addTodoInputRef.current.focus();
  }, [adding, opened]);

  useEffect(() => {
    if (editing) titleRef.current.focus();
  }, [editing]);

  const handleEditTodoList = async () => {
    setEditing(false);

    if (todoListTitle.length) {
      editTodoList({
        ...todoList,
        title: todoListTitle.replace(/\n/gim, ""),
      });
    }
    window.blur();
  };

  const addTodo = () => {
    createTodo(todoTitle, todoList.id);
    setTodoTitle("");
  };

  const duplicateTodoList = async (e) => {
    createTodoList({
      ...todoList,
      completed: false,
      todos: todoList.todos
        ? todoList.todos.map((t) => ({ ...t, completed: false }))
        : [],
    });
  };

  const duplicateTodoListWithState = () => {
    createTodoList(todoList);
  };

  const completeTodoList = async () => {
    editTodoList({ ...todoList, completed: !todoList.completed });
  };

  const handleOpenClick = (e) => {
    if (e.target.id !== "todolist") return;
    if (!editing) {
      setOpened((p) => !p);
    }
  };

  const handleDeleteTodoList = async (e) => {
    e.stopPropagation();
    deleteTodoList(todoList.id);
  };

  const handleDrop = async () => {
    moveDraggedTodoTo(todoList.id);
  };

  const toggleEditing = () => {
    setEditing((p) => !p);
  };

  const toggleAllComplete = async () => {
    await toggleTodoListAndTodosComplete({
      ...todoList,
      completed: !todoList.completed,
    });
  };

  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div
        id="todolist"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="px-4 py-2 my-1 w-full bg-base-100 rounded-xl flex items-center hover:bg-slate-800 cursor-pointer"
        onClick={handleOpenClick}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            checked={todoList.completed}
            onChange={completeTodoList}
            type="checkbox"
            className="checkbox checkbox-primary mr-3"
          />
          {editing ? (
            <input
              value={todoListTitle}
              ref={titleRef}
              onChange={(e) => setTodoListTitle(e.target.value)}
              class="input input-bordered w-full mr-2 h-8"
            />
          ) : (
            <span>{todoList.title}</span>
          )}
        </div>

        <div class="dropdown dropdown-end ml-auto m-1">
          <button
            tabindex="0"
            class="btn btn-ghost btn-sm btn-square hover:bg-slate-700 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
          <ul
            tabindex="0"
            class="dropdown-content menu p-1 shadow bg-slate-900 mt-1 rounded-xl z-10 w-52 border border-slate-700"
          >
            <li onClick={handleDeleteTodoList}>
              <a>Delete</a>
            </li>

            <li onClick={duplicateTodoList}>
              <a>Duplicate</a>
            </li>
            <li onClick={duplicateTodoListWithState}>
              <a>Duplicate with state</a>
            </li>
            <li onClick={toggleEditing}>
              <a>Edit</a>
            </li>
            <li onClick={toggleAllComplete}>
              <a>{todoList.completed ? "Incomplete all" : "Complete all"}</a>
            </li>
          </ul>
        </div>
        <div class="ml-1 btn-square btn-sm flex items-center justify-center font-semibold rounded-md bg-slate-800">
          {todoList.todos.length}
        </div>
      </div>

      {opened && (
        <div className="w-11/12 ml-auto box-border">
          {todoList.todos &&
            todoList.todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
          {adding ? (
            <input
              ref={addTodoInputRef}
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              placeholder="Add"
              type="text"
              className="input mt-auto input-bordered w-full min-h-[46px]"
            />
          ) : (
            <button
              className="btn btn-ghost hover:bg-slate-800 rounded-lg w-full px-2"
              onClick={() => setAdding(true)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span className="mr-auto capitalize text-md">Add todo</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
