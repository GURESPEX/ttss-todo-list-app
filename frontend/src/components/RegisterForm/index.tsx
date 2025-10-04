import React, { useCallback, useLayoutEffect, useState } from "react";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import type { CheckboxProps } from "../ui/Checkbox/type";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../../api/auth";
import Label from "../ui/Label";

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

  const [callRegister, { isLoading }] = authApi.useRegisterMutation();

  const { register, handleSubmit, formState, reset, setError, clearErrors, subscribe } = useForm<RegisterFieldValues>({ resolver: zodResolver(registerFieldValuesSchema) });

  useLayoutEffect(() => {
    const callback = subscribe({
      name: ["password", "confirmPassword"],
      formState: {
        values: true,
      },
      callback: (data) => {
        if (data.values.password !== data.values.confirmPassword) {
          setError("root", { message: "Confirm password is not same as password" });
        } else {
          console.log(555);
          clearErrors("root");
        }
      },
    });
    return () => callback();
  }, [clearErrors, setError, subscribe]);

  const onSubmit = useCallback<SubmitHandler<RegisterFieldValues>>(
    async (data) => {
      const { error } = await callRegister({
        username: data.username,
        password: data.password,
      });
      if (error) {
        setError("root", { message: error.data.message });
        return;
      }
      reset();
    },
    [callRegister, reset, setError],
  );

  const handleChangeIsShowPassword = useCallback<Exclude<CheckboxProps["onChange"], undefined>>((event) => {
    setIsShowPassword(event.target.checked);
  }, []);

  return (
    <form className="flex w-full flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">Register</h2>
      <form action=""></form>
      <Label label="Username">
        {(id) => (
          <>
            <Input type="text" id={id} placeholder="Username" {...register("username")} />
            <div className="text-sm text-red-500">{formState.errors.username?.message}</div>
          </>
        )}
      </Label>
      <div className="flex gap-2">
        <Label label="Password">
          {(id) => (
            <>
              <Input type={isShowPassword ? "text" : "password"} id={id} placeholder="Password" {...register("password")} />
              <div className="text-sm text-red-500">{formState.errors.password?.message}</div>
            </>
          )}
        </Label>
        <Label label="Confirm password">
          {(id) => (
            <>
              <Input type={isShowPassword ? "text" : "password"} id={id} placeholder="Confirm password" {...register("confirmPassword")} />
              <div className="text-sm text-red-500">{formState.errors.confirmPassword?.message}</div>
            </>
          )}
        </Label>
      </div>
      <div className="text-sm text-red-500">{formState.errors.root?.message}</div>
      <Checkbox checked={isShowPassword} onChange={handleChangeIsShowPassword}>
        Show password
      </Checkbox>
      <Button type="submit" loading={isLoading}>
        Register
      </Button>
    </form>
  );
};

export default React.memo(RegisterForm);
