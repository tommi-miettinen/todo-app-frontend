import { useState, useEffect, useRef } from "react";
import { useTodoListStore } from "../../store/store";

const TodoForm = () => {
  const [title, setTitle] = useState("");

  const createTodoList = useTodoListStore((state) => state.createTodoList);

  const ref = useRef();

  const addTodoList = () => {
    createTodoList({ title });
    setTitle("");
  };

  useEffect(() => {
    const handleEnterPress = async (e) => {
      if (e.key === "Enter" && document.activeElement === ref.current)
        addTodoList();
    };

    window.addEventListener("keydown", handleEnterPress);

    return () => window.removeEventListener("keydown", handleEnterPress);
  });

  return (
    <input
      className="input mt-auto input-bordered w-full min-h-[46px]"
      ref={ref}
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      type="text"
      placeholder="Add"
    />
  );
};

export default TodoForm;
