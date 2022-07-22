import { useState } from "react";
import tasklist from "../../api/tasklist";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import "./LoginForm.css";

const LoginForm = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
    await tasklist.createUser({ username, password });
  };

  const login = async () => {
    const token = await tasklist.login(username, password);
    if (token) setLoggedIn(true);
  };

  return (
    <Box className="login-form">
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          type="username"
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </FormControl>
      <div style={{ display: "flex", marginTop: 8 }}>
        <Button width="100%" colorScheme="blue" onClick={login}>
          Login
        </Button>
      </div>
      <span onClick={createUser}>
        Don't have an account? <span style={{ color: "blue" }}>signup</span>
      </span>
    </Box>
  );
};

export default LoginForm;
