import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

axios.defaults.headers.authorization = localStorage.token;

const createUser = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/users`, user);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const login = async (username, password) => {
  const res = await axios.post(`${baseUrl}/login`, {
    username,
    password,
  });
  axios.defaults.headers.authorization = res.data;
  localStorage.token = res.data;
  return res.data;
};

const getTodoLists = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todolists`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createTodo = async (title, todoListId) => {
  try {
    const res = await axios.post(`${baseUrl}/todolists/${todoListId}/todos`, {
      title,
      description: title,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createTodoList = async (todoList) => {
  try {
    const res = await axios.post(`${baseUrl}/todolists`, todoList);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteTodoList = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todolists/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const editTodoList = async (todoList) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/todolists/${todoList.id}`,
      todoList
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const editTodo = async (todo) => {
  try {
    const res = await axios.patch(`${baseUrl}/todos/${todo.id}`, todo);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getPermissions = async () => {
  try {
    const res = await axios.get(`${baseUrl}/permissions`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default {
  createUser,
  login,
  createTodo,
  createTodoList,
  getTodoLists,
  deleteTodoList,
  deleteTodo,
  editTodoList,
  editTodo,
  getPermissions,
};
