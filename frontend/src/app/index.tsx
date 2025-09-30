import { useCallback, useState } from "react";
import { authApi } from "../api/auth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import type { InputProps } from "../components/ui/Input/type";

const App = () => {
  const [register, { data: registerData }] = authApi.useRegisterMutation();
  const [login, { data: loginData }] = authApi.useLoginMutation();
  const [logout, { data: logoutData }] = authApi.useLogoutMutation();

  const [user, setUser] = useState(undefined);

  const [loginFormState, setLoginFormState] = useState<{ username: string; password: string }>({ username: "", password: "" });

  const handleChangeUsername = useCallback<Exclude<InputProps["onChange"], undefined>>((event) => {
    setLoginFormState((prev) => ({ ...prev, username: event.target.value }));
  }, []);

  const handleChangePassword = useCallback<Exclude<InputProps["onChange"], undefined>>((event) => {
    setLoginFormState((prev) => ({ ...prev, password: event.target.value }));
  }, []);

  return (
    <div>
      <div>App</div>
      <div>
        <Input type="text" onChange={handleChangeUsername} placeholder="Username" />
        <Input type="password" onChange={handleChangePassword} placeholder="Password" />
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default App;
