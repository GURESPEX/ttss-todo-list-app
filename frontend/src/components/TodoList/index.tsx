import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { todoApi } from "../../api/todo";
import { useAuth } from "../../contexts/AuthProvider/hooks";
import CreateTodoForm from "../CreateTodoForm";
import TodoItem from "../TodoItem";
import Divider from "../ui/Divider";
import { Inbox } from "lucide-react";
import Button from "../ui/Button";
import type { ButtonProps } from "../ui/Button/type";
import type { Todo } from "../../api/todo/type";

const TodoList = () => {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  const { user } = useAuth();

  const [callGetAll, { data: todosData }] = todoApi.useLazyGetAllQuery();

  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    callGetAll({ access_token: user.access_token });
  }, [callGetAll, user]);

  const handleToggleShowAll = useCallback<Exclude<ButtonProps["onClick"], undefined>>(() => {
    setIsShowAll((prev) => !prev);
  }, []);

  const todos = useMemo(() => todosData?.result ?? [], [todosData?.result]);

  const filteredTodos = useMemo<Todo[]>(() => todos.filter((todo) => isShowAll || !todo.is_done), [todos, isShowAll]);

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-end gap-2">
        <CreateTodoForm />
        <Button className="px-4" variant={isShowAll ? "solid" : "outline"} onClick={handleToggleShowAll}>
          All
        </Button>
      </div>
      <Divider className="bg-slate-200" />
      <div className="flex justify-end">
        <p className="text-2xl font-bold">
          {todos.length - todos.reduce<number>((result, todo) => (!todo.is_done ? ++result : result), 0)}/{todos.length} Item{todos.length > 1 ? "s" : null}
        </p>
      </div>
      <div className="relative grid grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] gap-2">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} showDelete={isShowAll} />)
        ) : (
          <div className="absolute top-0 left-0 flex aspect-square h-64 w-full flex-col items-center justify-center gap-4 text-slate-300">
            <Inbox className="size-16" />
            <p className="text-xl font-bold uppercase">Empty TODO</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(TodoList);
