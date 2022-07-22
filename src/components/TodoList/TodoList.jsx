import { Input, Button } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { BsPlusLg, BsCheckLg, BsCheck, BsClockFill } from "react-icons/bs";
import tasklist from "../../api/tasklist";

const TodoList = ({
  todoList,
  deleteTodoList,
  fetchTodoLists,
  dragged,
  setDragged,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tasklistTitle, setTasklistTitle] = useState(todoList.title);
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);

  const ref = useRef();

  useEffect(() => {
    const handleKeyPress = async (e) => {
      if (adding && e.key === "Enter") await addTask();
      if (editing && e.key === "Enter") {
        setTasklistTitle(ref.current.textContent.replace(/\n/gim, ""));
        setEditing(false);
        await tasklist.editTodoList(
          { ...todoList, title: ref.current.textContent },
          todoList.id
        );
        fetchTodoLists();
        window.blur();
      }
    };

    const handleClick = (e) => {
      if (e.target.id !== "options") setOptionsVisible(false);
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("click", handleClick);
    };
  }, [title, editing]);

  const addTask = async () => {
    console.log("adding", title);
    await tasklist.createTodo(title, todoList.id);
    setTitle("");
    fetchTodoLists();
  };

  const handleOptionsClick = (e) => {
    console.log(e);
    setClientX(e.clientX);
    setClientY(e.clientY);
    e.stopPropagation();
    setOptionsVisible((p) => !p);
  };

  const copy = async (e) => {
    e.stopPropagation();
    setOptionsVisible(false);

    await tasklist.copyTodoList({
      ...todoList,
      completed: false,
      todos: todoList.todos.map((t) => ({ ...t, completed: false })),
    });

    fetchTodoLists();
  };

  const copyWithState = async (e) => {
    e.stopPropagation();
    setOptionsVisible(false);
    await tasklist.copyTodoList(todoList);
    fetchTodoLists();
  };

  const deleteTodo = async (id) => {
    await tasklist.deleteTodo(id);
    fetchTodoLists();
  };

  const completeTodo = async (id) => {
    await tasklist.completeTodo(id);
    fetchTodoLists();
  };

  const completeTodoList = async (e) => {
    e.stopPropagation();
    setOptionsVisible(false);
    const editedTodo = { ...todoList, completed: !todoList.completed };
    delete editedTodo.todos;
    const newTodoList = await tasklist.editTodoList(editedTodo, todoList.id);
    fetchTodoLists();
  };

  const handleOpenClick = (e) => {
    setOpened((p) => !p);
  };

  const handleDeleteTodoList = async (e) => {
    e.stopPropagation();
    deleteTodoList(todoList.id);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    await tasklist.moveTodoToList(dragged.id, todoList.id);
    fetchTodoLists();
    console.log("fetched");
  };

  const handleEditing = (e) => {
    e.stopPropagation();
    setEditing((p) => !p);
  };

  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {optionsVisible && (
        <div
          id="options"
          style={{
            position: "fixed",
            boxShadow: "0px 0px 3px 0px lightgrey",
            marginBottom: "100%",
            borderRadius: 8,
            left: clientX - 50,
            top: clientY + 10,
            backgroundColor: "white",
            padding: 4,
            zIndex: Date.now(),
            marginTop: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="button"
            onClick={handleDeleteTodoList}
          >
            <MdDelete />
            <span style={{ marginLeft: 8 }}>Delete</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="button"
            id="edit-button"
            onClick={handleEditing}
          >
            <MdModeEdit />
            <span style={{ marginLeft: 8 }}>Edit</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="button"
            id="edit-button"
            onClick={copy}
          >
            <IoCopy />
            <span style={{ marginLeft: 8 }}>Duplicate</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="button"
            id="edit-button"
            onClick={copyWithState}
          >
            <IoCopy />
            <span style={{ marginLeft: 8 }}>Duplicate with state</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="button"
            onClick={completeTodoList}
          >
            <BsCheckLg style={{ fontSize: 14 }} />
            <span style={{ marginLeft: 8 }}>
              {todoList.completed ? "Incomplete" : "Complete"}
            </span>
          </div>
        </div>
      )}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="todolist"
        onClick={handleOpenClick}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {todoList.completed ? (
            <div>
              <BsCheckCircleFill style={{ color: "green", opacity: 0.8 }} />
            </div>
          ) : (
            <div>
              <BsClockFill style={{ color: "orange", opacity: 0.8 }} />
            </div>
          )}
          <div
            className="todolist-title"
            ref={ref}
            style={{
              border: editing && "1px solid grey",
            }}
            contentEditable={editing}
          >
            {tasklistTitle}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div onClick={handleOptionsClick} className="button">
              <BsThreeDotsVertical />
            </div>
            <div
              style={{
                height: 20,
                width: 20,
                backgroundColor: "lightgrey",
                opacity: 0.6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: "bold",
                marginLeft: 4,
              }}
            >
              {todoList.todos ? todoList.todos.length : 0}
            </div>
          </div>
        </div>
      </div>
      {opened && (
        <div
          style={{
            padding: 8,
            paddingLeft: 44,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            {todoList.todos &&
              todoList.todos.map((task) => (
                <div
                  className="todo"
                  draggable={true}
                  key={task.id}
                  onDragStart={() => setDragged(task)}
                >
                  <div
                    style={{
                      textTransform: "capitalize",
                      marginLeft: 8,
                      color: task.completed ? "green" : "black",
                      textDecoration: task.completed && "line-through",
                    }}
                  >
                    {task.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 4,
                    }}
                  >
                    <div className="button" onClick={() => deleteTodo(task.id)}>
                      <MdDelete />
                    </div>
                    <div
                      className="button"
                      style={{ padding: 3.25 }}
                      onClick={() => completeTodo(task.id)}
                    >
                      <BsCheck style={{ fontSize: 24 }} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {adding ? (
            <div style={{ display: "flex" }}>
              <Button onClick={() => setAdding(false)}>
                <AiOutlineMinus style={{ fontSize: 20 }} />
              </Button>
              <Input
                style={{ marginLeft: 8, marginRight: 8 }}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
              />
            </div>
          ) : (
            <div
              onClick={() => setAdding(true)}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 14,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <Button>
                <BsPlusLg style={{ opacity: 0.3 }} />
              </Button>
              <span style={{ marginLeft: 8 }}>Add todo</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TodoLists = ({ todoLists, deleteTodoList, fetchTodoLists }) => {
  const [dragged, setDragged] = useState();
  return (
    <div className="todolist-container">
      {todoLists.map((todoList) => (
        <TodoList
          key={todoList.id}
          todoList={todoList}
          dragged={dragged}
          setDragged={setDragged}
          deleteTodoList={deleteTodoList}
          fetchTodoLists={fetchTodoLists}
        />
      ))}
    </div>
  );
};

export default TodoLists;
