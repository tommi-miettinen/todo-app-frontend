import LoginForm from "./components/LoginForm/LoginForm";
import TodoLists from "./components/TodoLists/TodoLists";
import Navigation from "./components/Navigation/Navigation";
import { useTodoListStore } from "./store/store";
import "./App.css";

const App = () => {
  const loggedIn = useTodoListStore((state) => state.loggedIn);

  return (
    <div className="h-screen bg-base-300 flex flex-col items-center">
      <Navigation />
      <div className="w-screen mt-4 sm:w-7/12 xl:w-3/12 rounded-xl h-2/3 bg-base-200 flex flex-col items-center justify-center">
        {loggedIn ? <TodoLists /> : <LoginForm />}
      </div>
    </div>
  );
};

export default App;
