import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";

const TodoForm = ({ createTodo }) => {
  const [title, setTitle] = useState("");

  return (
    <div style={{ marginTop: "auto" }}>
      <div style={{ display: "flex" }}>
        <Input
          style={{ marginRight: 8 }}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
        />
        <Button
          colorScheme="green"
          onClick={() => {
            createTodo(title);
            setTitle("");
          }}
        >
          <BsPlusLg />
        </Button>
      </div>
    </div>
  );
};

export default TodoForm;
