import { useCallback, useState } from "react";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Input from "../../ui/Input";
import type { ButtonProps } from "../../ui/Button/type";
import type { CheckboxProps } from "../../ui/Checkbox/type";
import type { InputProps } from "../../ui/Input/type";
import { authApi } from "../../../api/auth";

const RegisterForm = () => {
  const [RegisterFormState, setRegisterFormState] = useState<{ username: string; password: string; confirmPassword: string }>({ username: "", password: "", confirmPassword: "" });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [register, { data: registerData, isLoading: isRegisterLoading }] = authApi.useRegisterMutation();

  console.log(registerData);

  const handleChangeUsername = useCallback<Exclude<InputProps["onChange"], undefined>>((value) => {
    setRegisterFormState((prev) => ({ ...prev, username: value ?? "" }));
  }, []);

  const handleChangePassword = useCallback<Exclude<InputProps["onChange"], undefined>>((value) => {
    setRegisterFormState((prev) => ({ ...prev, password: value ?? "" }));
  }, []);

  const handleChangeConfirmPassword = useCallback<Exclude<InputProps["onChange"], undefined>>((value) => {
    setRegisterFormState((prev) => ({ ...prev, confirmPassword: value ?? "" }));
  }, []);

  const handleChangeIsShowPassword = useCallback<Exclude<CheckboxProps["onChange"], undefined>>((value) => {
    setIsShowPassword(value ?? false);
  }, []);

  const handleClickRegister = useCallback<Exclude<ButtonProps["onChange"], undefined>>(() => {
    register({ username: RegisterFormState.username, password: RegisterFormState.password });
  }, [register, RegisterFormState.password, RegisterFormState.username]);

  return (
    <div>
      <Input type="text" value={RegisterFormState.username} onChange={handleChangeUsername} placeholder="Username" />
      <Input type={isShowPassword ? "text" : "password"} value={RegisterFormState.password} onChange={handleChangePassword} placeholder="Password" />
      <Input type={isShowPassword ? "text" : "password"} value={RegisterFormState.confirmPassword} onChange={handleChangeConfirmPassword} placeholder="Confirm password" />
      <Checkbox checked={isShowPassword} onChange={handleChangeIsShowPassword}>
        Show password
      </Checkbox>
      <Button onClick={handleClickRegister} disabled={isRegisterLoading}>
        Register
      </Button>
    </div>
  );
};

export default RegisterForm;
