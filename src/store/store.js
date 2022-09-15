import create from "zustand";
import todoListAPI from "../api/todoAPI";

export const useTodoListStore = create((set, get) => ({
  todoLists: [],
  draggedTodo: null,
  loggedIn: localStorage.token ? true : false,
  fetchTodoLists: async () => {
    const fetchedTodoLists = await todoListAPI.getTodoLists();
    await todoListAPI.getPermissions();
    if (fetchedTodoLists) set({ todoLists: fetchedTodoLists });
  },
  deleteTodoList: async (id) => {
    const deleted = await todoListAPI.deleteTodoList(id);
    if (!deleted) return;
    set({
      todoLists: get().todoLists.filter((t) => t.id !== id),
    });
  },
  deleteTodo: async (todo) => {
    const deleted = await todoListAPI.deleteTodo(todo.id);
    if (!deleted) return;
    set({
      todoLists: get().todoLists.map((t) => ({
        ...t,
        todos: t.todos.filter((e) => e.id !== todo.id),
      })),
    });
  },
  editTodo: async (todo) => {
    await todoListAPI.editTodo(todo);
    await get().fetchTodoLists();
  },
  createTodo: async (title, todoListId) => {
    if (!title || !todoListId) return;
    const newTodo = await todoListAPI.createTodo(title, todoListId);
    if (!newTodo) return;
    set({
      todoLists: get().todoLists.map((t) =>
        t.id === todoListId
          ? {
              ...t,
              todos: [...t.todos, newTodo],
            }
          : t
      ),
    });
  },
  createTodoList: async (todoList) => {
    const newTodoList = await todoListAPI.createTodoList(todoList);
    if (!newTodoList) return;
    set({
      todoLists: [...get().todoLists, newTodoList],
    });
  },
  editTodoList: async (todoList) => {
    const editedList = await todoListAPI.editTodoList(todoList);
    if (!editedList) return;
    set({
      todoLists: get().todoLists.map((t) =>
        t.id === todoList.id ? editedList : t
      ),
    });
  },
  setDraggedTodo: (todo) => {
    set({ draggedTodo: todo });
  },
  moveDraggedTodoTo: async (todoListId) => {
    await todoListAPI.editTodo({ ...get().draggedTodo, todoListId });
    await get().fetchTodoLists();
  },
  toggleTodoListAndTodosComplete: async (todoList) => {
    await Promise.all([
      todoList.todos.map((todo) =>
        todoListAPI.editTodo({ ...todo, completed: todoList.completed })
      ),
      todoListAPI.editTodoList(todoList),
    ]);
    await get().fetchTodoLists();
  },
  signup: async (username, password) => {
    const res = await todoListAPI.createUser({ username, password });
    return Boolean(res);
  },
  login: async (username, password) => {
    const token = await todoListAPI.login(username, password);
    localStorage.token = token;
    set({ loggedIn: true });
  },
}));
