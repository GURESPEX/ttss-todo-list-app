import { useCallback, useState } from "react";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Input from "../../ui/Input";
import type { CheckboxProps } from "../../ui/Checkbox/type";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../../../api/auth";

const registerFieldValuesSchema = z.object({
  username: z
    .string()
    .min(4)
    .max(32)
    .regex(/^[A-z0-9_.]+$/),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type RegisterFieldValues = z.infer<typeof registerFieldValuesSchema>;

const RegisterForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [callRegister] = authApi.useRegisterMutation();

  const { register, handleSubmit, formState } = useForm<RegisterFieldValues>({ resolver: zodResolver(registerFieldValuesSchema) });

  const onSubmit = useCallback<SubmitHandler<RegisterFieldValues>>(
    (data) => {
      callRegister({
        username: data.username,
        password: data.password,
      });
    },
    [callRegister],
  );

  const handleChangeIsShowPassword = useCallback<Exclude<CheckboxProps["onChange"], undefined>>((event) => {
    setIsShowPassword(event.target.checked);
  }, []);

  return (
    <form className="flex flex-col gap-2 rounded-md border p-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl">Register</h2>
      <form action=""></form>
      <Input type="text" placeholder="Username" {...register("username")} />
      {formState.errors.username?.message}
      <Input type={isShowPassword ? "text" : "password"} placeholder="Password" {...register("password")} />
      {formState.errors.password?.message}
      <Input type={isShowPassword ? "text" : "password"} placeholder="Confirm password" {...register("confirmPassword")} />
      {formState.errors.confirmPassword?.message}
      <Checkbox checked={isShowPassword} onChange={handleChangeIsShowPassword}>
        Show password
      </Checkbox>
      <Button type="submit" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
