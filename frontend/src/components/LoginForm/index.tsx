import React, { useCallback, useState } from "react";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import type { CheckboxProps } from "../ui/Checkbox/type";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthProvider/hooks";
import Label from "../ui/Label";

const loginFieldValuesSchema = z.object({
  username: z
    .string()
    .min(4)
    .max(32)
    .regex(/^[A-z0-9_.]+$/),
  password: z.string().min(8),
});

type LoginFieldValues = z.infer<typeof loginFieldValuesSchema>;

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const { loginHandler } = useAuth();

  const { register, handleSubmit, formState, reset, setError } = useForm<LoginFieldValues>({ resolver: zodResolver(loginFieldValuesSchema) });

  const onSubmit = useCallback<SubmitHandler<LoginFieldValues>>(
    async (data) => {
      const error = await loginHandler.login({ username: data.username, password: data.password });
      if (error) {
        setError("root", { message: error.error.data.message });
        return;
      }
      reset();
    },
    [loginHandler, reset, setError],
  );

  const handleChangeIsShowPassword = useCallback<Exclude<CheckboxProps["onChange"], undefined>>((event) => {
    setIsShowPassword(event.target.checked);
  }, []);

  return (
    <form className="flex w-full flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">Login</h2>
      <Label label="Username">
        {(id) => (
          <>
            <Input type="text" id={id} placeholder="Username" {...register("username")} />
            <div className="text-sm text-red-500">{formState.errors.username?.message}</div>
          </>
        )}
      </Label>
      <Label label="Password">
        {(id) => (
          <>
            <Input type={isShowPassword ? "text" : "password"} id={id} placeholder="Password" {...register("password")} />
            <div className="text-sm text-red-500">{formState.errors.password?.message}</div>
          </>
        )}
      </Label>
      <Checkbox checked={isShowPassword} onChange={handleChangeIsShowPassword}>
        Show password
      </Checkbox>
      <div className="text-sm text-red-500">{formState.errors.root?.message}</div>
      <Button loading={loginHandler.loginState.isLoading}>Login</Button>
    </form>
  );
};

export default React.memo(LoginForm);
