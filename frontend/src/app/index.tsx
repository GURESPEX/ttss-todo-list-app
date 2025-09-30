import { useState } from "react";
import { authApi } from "../api/auth";
import LoginForm from "../components/TodoList/LoginForm";
import RegisterForm from "../components/TodoList/RegisterForm";

const App = () => {
  const [logout, { data: logoutData }] = authApi.useLogoutMutation();

  const [user, setUser] = useState(undefined);

  return (
    <div>
      <div>App</div>
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default App;
