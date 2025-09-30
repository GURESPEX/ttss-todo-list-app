import { useCallback, useState } from "react";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Input from "../../ui/Input";
import type { CheckboxProps } from "../../ui/Checkbox/type";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../../../api/auth";

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

  const [callLogin] = authApi.useLoginMutation();

  const { register, handleSubmit, formState } = useForm<LoginFieldValues>({ resolver: zodResolver(loginFieldValuesSchema) });

  const onSubmit = useCallback<SubmitHandler<LoginFieldValues>>(
    (data) => {
      callLogin({
        username: data.username,
        password: data.password,
      });
    },
    [callLogin],
  );

  const handleChangeIsShowPassword = useCallback<Exclude<CheckboxProps["onChange"], undefined>>((event) => {
    setIsShowPassword(event.target.checked);
  }, []);

  return (
    <form className="flex flex-col gap-2 rounded-md border p-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl">Login</h2>
      <Input type="text" placeholder="Username" {...register("username")} />
      {formState.errors.username?.message}
      <Input type={isShowPassword ? "text" : "password"} placeholder="Password" {...register("password")} />
      {formState.errors.password?.message}
      <Checkbox checked={isShowPassword} onChange={handleChangeIsShowPassword}>
        Show password
      </Checkbox>
      <Button>Login</Button>
    </form>
  );
};

export default LoginForm;
