import { authApi } from "../api/auth";
import LoginForm from "../components/TodoList/LoginForm";
import RegisterForm from "../components/TodoList/RegisterForm";

const App = () => {
  const [logout] = authApi.useLogoutMutation();

  return (
    <div className="flex h-screen w-screen flex-col items-center">
      <div className="flex h-full w-full max-w-[1024px] flex-col border">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};

export default App;
