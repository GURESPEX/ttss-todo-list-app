import React, { useCallback } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoApi } from "../../api/todo";
import { useAuth } from "../../contexts/AuthProvider/hooks";
import { Plus } from "lucide-react";
import Label from "../ui/Label";

const createTodoFieldValuesSchema = z.object({
  title: z.string().optional(),
  content: z.string(),
});

type CreateTodoFieldValues = z.infer<typeof createTodoFieldValuesSchema>;

const CreateTodoForm = () => {
  const { refreshHandler } = useAuth();

  const [callCreateTodo, { isLoading }] = todoApi.useCreateMutation();

  const { register, handleSubmit, formState, reset } = useForm<CreateTodoFieldValues>({ resolver: zodResolver(createTodoFieldValuesSchema) });

  const onSubmit = useCallback<SubmitHandler<CreateTodoFieldValues>>(
    async (data) => {
      refreshHandler.refresh(async (refreshedUser) => {
        const { error } = await callCreateTodo({
          access_token: refreshedUser.access_token,
          title: data.title || undefined,
          content: data.content,
        });
        if (error) {
          return false;
        }
        reset();
      });
    },
    [callCreateTodo, refreshHandler, reset],
  );

  return (
    <form className="flex w-full items-end gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1">
        <Label label="Title">
          {(id) => (
            <>
              <Input type="text" id={id} className="w-full" placeholder="Title" {...register("title")} />
              {formState.errors.title?.message}
            </>
          )}
        </Label>
      </div>
      <div className="flex-1">
        <Label label="Content">
          {(id) => (
            <>
              <Input type="text" id={id} className="w-full" placeholder="Content" {...register("content")} />
              {formState.errors.content?.message}
            </>
          )}
        </Label>
      </div>
      <Button type="submit" loading={isLoading} disabled={!formState.isValid} icon={<Plus />} />
    </form>
  );
};

export default React.memo(CreateTodoForm);
