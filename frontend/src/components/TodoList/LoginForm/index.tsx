import { useCallback, useState } from "react";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Input from "../../ui/Input";
import type { ButtonProps } from "../../ui/Button/type";
import type { CheckboxProps } from "../../ui/Checkbox/type";
import type { InputProps } from "../../ui/Input/type";
import { authApi } from "../../../api/auth";

const LoginForm = () => {
  const [loginFormState, setLoginFormState] = useState<{ username: string; password: string }>({ username: "", password: "" });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [login, { data: loginData, isLoading: isLoginLoading }] = authApi.useLoginMutation();

  console.log(loginData);

  const handleChangeUsername = useCallback<Exclude<InputProps["onChange"], undefined>>((value) => {
    setLoginFormState((prev) => ({ ...prev, username: value ?? "" }));
  }, []);

  const handleChangePassword = useCallback<Exclude<InputProps["onChange"], undefined>>((value) => {
    setLoginFormState((prev) => ({ ...prev, password: value ?? "" }));
  }, []);

  const handleChangeIsShowPassword = useCallback<Exclude<CheckboxProps["onChange"], undefined>>((value) => {
    setIsShowPassword(value ?? false);
  }, []);

  const handleClickLogin = useCallback<Exclude<ButtonProps["onChange"], undefined>>(() => {
    login({ username: loginFormState.username, password: loginFormState.password });
  }, [login, loginFormState.password, loginFormState.username]);

  return (
    <div>
      <Input type="text" value={loginFormState.username} onChange={handleChangeUsername} placeholder="Username" />
      <Input type={isShowPassword ? "text" : "password"} value={loginFormState.password} onChange={handleChangePassword} placeholder="Password" />
      <Checkbox checked={isShowPassword} onChange={handleChangeIsShowPassword}>
        Show password
      </Checkbox>
      <Button onClick={handleClickLogin} disabled={isLoginLoading}>
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
