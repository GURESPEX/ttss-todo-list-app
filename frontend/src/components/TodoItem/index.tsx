import z from "zod";
import type { Todo } from "../../api/todo/type";
import React, { useCallback, useLayoutEffect, useMemo, useState, type ComponentProps } from "react";
import { useAuth } from "../../contexts/AuthProvider/hooks";
import { todoApi } from "../../api/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type ControllerRenderProps, type SubmitHandler } from "react-hook-form";
import type { ButtonProps } from "../ui/Button/type";
import Button from "../ui/Button";
import { Check, Save, Trash2, Undo2 } from "lucide-react";
import dayjs from "dayjs";
import Skeleton from "../ui/Skeleton";

const DATETIME_FORMAT = "D MMMM YYYY";

const updateTodoFieldValuesSchema = z.object({
  title: z.string().optional(),
  content: z.string(),
  is_done: z.boolean(),
});

type UpdateTodoFieldValues = z.infer<typeof updateTodoFieldValuesSchema>;

type TodoItemProps = { todo: Todo; showDelete?: boolean };

const TodoItem = (props: TodoItemProps) => {
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

  const { user, refreshHandler } = useAuth();

  const [callGetTodoById, { data: todoData, isLoading: isGetTodoByIdLoading }] = todoApi.useLazyGetByIdQuery();
  const todo = useMemo(() => todoData?.result, [todoData?.result]);

  const [callUpdateTodo, { isLoading: isUpdating }] = todoApi.useUpdateMutation();
  const [callDeleteTodo, { isLoading: isDeleting }] = todoApi.useDeleteMutation();

  const { register, handleSubmit, reset, control, setValue } = useForm<UpdateTodoFieldValues>({
    resolver: zodResolver(updateTodoFieldValuesSchema),
  });

  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    callGetTodoById({ access_token: user.access_token, id: props.todo.id });
  }, [callGetTodoById, props.todo.id, todo, user]);

  useLayoutEffect(() => {
    if (!todo) {
      return;
    }
    setValue("title", todo.title);
    setValue("content", todo.content);
    setValue("is_done", todo.is_done);
  }, [todo?.content, todo?.is_done, todo?.title, setValue, todo]);

  const onSubmit = useCallback<SubmitHandler<UpdateTodoFieldValues>>(
    async (data) => {
      if (!todo) {
        return;
      }
      refreshHandler.refresh(async (refreshedUser) => {
        const { error } = await callUpdateTodo({
          access_token: refreshedUser.access_token,
          id: todo.id,
          title: data.title || undefined,
          content: data.content,
          is_done: data.is_done,
        });
        if (error) {
          return false;
        }
        reset();
      });
    },
    [todo, refreshHandler, callUpdateTodo, reset],
  );

  const handleToggleIsDone = useCallback<(field: ControllerRenderProps<UpdateTodoFieldValues, "is_done">) => Exclude<ComponentProps<"button">["onClick"], undefined>>(
    (field) => async () => {
      if (!todo) {
        return;
      }
      refreshHandler.refresh(async (refreshedUser) => {
        const { error } = await callUpdateTodo({
          access_token: refreshedUser.access_token,
          id: todo.id,
          title: todo.title || undefined,
          content: todo.content,
          is_done: !field.value,
        });
        if (error) {
          return false;
        }
        reset();
      });
    },
    [todo, refreshHandler, callUpdateTodo, reset],
  );

  const handleDelete = useCallback<Exclude<ButtonProps["onClick"], undefined>>(async () => {
    if (!todo) {
      return;
    }
    setIsConfirmDelete(true);
    if (!isConfirmDelete) {
      return;
    }
    refreshHandler.refresh(async (refreshedUser) => {
      const { error } = await callDeleteTodo({ access_token: refreshedUser.access_token, id: todo.id });
      if (error) {
        return false;
      }
    });
  }, [todo, isConfirmDelete, refreshHandler, callDeleteTodo]);

  const handleBlurDelete = useCallback<Exclude<ButtonProps["onBlur"], undefined>>(() => {
    setIsConfirmDelete(false);
  }, []);

  const createdOrUpdatedAtLabel = todo ? (todo.updated_at ? "Updated At" : todo.created_at ? "Created At" : null) : null;
  const createdOrUpdatedAt = todo ? (todo.updated_at ? todo.updated_at : todo.created_at ? todo.created_at : null) : null;

  return !isGetTodoByIdLoading ? (
    <form className="relative flex resize-y flex-col gap-2 overflow-hidden rounded border border-slate-200 bg-white p-4 transition-all hover:border-slate-400 [&:hover>.band]:bg-slate-400" onSubmit={handleSubmit(onSubmit)}>
      <div className="band absolute top-0 left-0 h-full w-1 bg-slate-200 transition-all" />
      <input type="text" className="text-lg font-bold outline-none" {...register("title")} />
      <textarea className="h-full resize-none rounded border border-slate-200 bg-slate-100 p-2 transition-all outline-none placeholder:text-slate-300" {...register("content")} rows={3} placeholder="No content" />
      <div className="flex gap-2">
        <Controller name="is_done" control={control} render={({ field }) => <Button type="button" className="flex-1" onClick={handleToggleIsDone(field)} loading={isUpdating} disabled={field.disabled} icon={field.value ? <Undo2 /> : <Check />} />} />
        <Button variant="outline" loading={isDeleting} icon={<Save />} />
        {(props.showDelete ?? false) ? <Button type="button" color="danger" variant={isConfirmDelete ? "solid" : "outline"} loading={isDeleting} icon={isConfirmDelete ? <Check /> : <Trash2 />} onClick={handleDelete} onBlur={handleBlurDelete} /> : null}
      </div>
      <div className="flex justify-end">
        {createdOrUpdatedAtLabel ? <span className="small-caps text-xs text-slate-400 lowercase">{createdOrUpdatedAtLabel}</span> : null}
        {createdOrUpdatedAt ? <span className="ml-1 text-xs text-slate-400">{dayjs(createdOrUpdatedAt).format(DATETIME_FORMAT)}</span> : null}
      </div>
    </form>
  ) : (
    <Skeleton className="h-[224px] w-full" />
  );
};

export default React.memo(TodoItem);
