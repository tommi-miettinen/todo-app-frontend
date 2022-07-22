import axios from "axios";

const baseUrl = "http://localhost:8080";

axios.defaults.headers.authorization = localStorage.token;

const getUsers = async () => {
  try {
    const users = await axios.get(`${baseUrl}/users`);
    return users;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const createUser = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/users`, user);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const login = async (username, password) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, {
      username,
      password,
    });
    axios.defaults.headers.authorization = res.data;
    localStorage.token = res.data;
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
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
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createTodoList = async (title) => {
  try {
    const res = await axios.post(`${baseUrl}/todolists`, {
      title,
    });
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

const editTodoList = async (todolist, id) => {
  try {
    const res = await axios.patch(`${baseUrl}/todolists/${id}`, {
      ...todolist,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("errored");
    console.log(err);
  }
};

const copyTodoList = async (todolist) => {
  try {
    const res = await axios.post(`${baseUrl}/todolists`, {
      ...todolist,
    });
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

const completeTodo = async (id) => {
  try {
    const res = await axios.patch(`${baseUrl}/todos/${id}`, {
      completed: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const moveTodoToList = async (todoId, todoListId) => {
  try {
    const res = await axios.patch(`${baseUrl}/todos/${todoId}`, {
      todoListId,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default {
  getUsers,
  createUser,
  login,
  getTodos,
  createTodo,
  createTodoList,
  getTodoLists,
  deleteTodoList,
  deleteTodo,
  copyTodoList,
  editTodoList,
  completeTodo,
  moveTodoToList,
};
