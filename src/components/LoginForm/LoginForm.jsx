import { useState } from "react";
import { useTodoListStore } from "../../store/store";
import Lottie from "react-lottie-player";
import checkmark from "../../assets/checkmark.json";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const signup = useTodoListStore((state) => state.signup);
  const login = useTodoListStore((state) => state.login);

  const handleUserCreate = async () => {
    const created = await signup(username, password);
    if (created) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <div className="card flex-shrink-0 w-full max-w-sm">
      {success ? (
        <div className="m-auto text-2xl text flex flex-col items-center justify-center">
          <Lottie
            loop
            animationData={checkmark}
            play
            style={{ width: 40, height: 40 }}
          />
          User created
        </div>
      ) : (
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => login(username, password)}
              className="btn btn-primary"
            >
              Login
            </button>
            <button onClick={handleUserCreate} className="btn btn-primary">
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
