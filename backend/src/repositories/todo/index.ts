import dayjs from "dayjs";
import Generator from "../../utils/generator";

export default abstract class TodoRepository {
  private static _todos: Todo[] = [];

  public static getAll = async (): Promise<Todo[]> => {
    return this._todos;
  };

  public static findAllByField = async <T extends keyof Todo>(
    field: T,
    value: Todo[T]
  ): Promise<Todo[]> => {
    return this._todos.filter((todo) => todo[field] === value);
  };

  public static findByField = async <T extends keyof Todo>(
    field: T,
    value: Todo[T]
  ): Promise<Todo | undefined> => {
    const foundTodo = this._todos.find((todo) => todo[field] === value);
    return foundTodo;
  };

  public static create = async (
    newTodo: Pick<Todo, "content" | "user_id"> & { title?: Todo["title"] }
  ): Promise<Todo> => {
    const dateNow = dayjs().toDate();
    const createdTodo: Todo = {
      ...newTodo,
      id: Generator.UUID(),
      title: newTodo.title || "Untitled",
      is_done: false,
      created_at: dateNow,
      updated_at: dateNow,
    };
    this._todos = [...this._todos, createdTodo];
    return createdTodo;
  };

  public static update = async (
    payload: Omit<Todo, "title" | "created_at" | "updated_at"> & {
      title?: Todo["title"];
    }
  ): Promise<Todo | undefined> => {
    const dateNow = dayjs().toDate();
    const foundTodoIndex = this._todos.findIndex(
      (todo) => todo.id === payload.id
    );
    if (foundTodoIndex < 0) {
      return undefined;
    }
    const updatedTodo = {
      ...this._todos[foundTodoIndex],
      ...payload,
      title: payload.title || "Untitled",
      updated_at: dateNow,
    };
    this._todos[foundTodoIndex] = updatedTodo;
    return updatedTodo;
  };

  public static deleteByField = async <T extends keyof Todo>(
    field: T,
    value: Todo[T]
  ): Promise<Todo | undefined> => {
    const foundTodoIndex = this._todos.findIndex(
      (todo) => todo[field] === value,
      []
    );
    const deletedTodo = this._todos.splice(foundTodoIndex, 1)[0];
    return deletedTodo;
  };

  public static deleteRangeByField = async <T extends keyof Todo>(
    field: T,
    value: Todo[T]
  ): Promise<Todo[]> => {
    const deletedTodos = this._todos.reduce<Todo[]>((result, todo) => {
      if (todo[field] === value) return result;
      return [...result, todo];
    }, []);
    this._todos = deletedTodos;
    return deletedTodos;
  };
}

export type Todo = {
  id: string;
  title: string;
  content: string;
  is_done: boolean;
  user_id: string;
  created_at: Date;
  updated_at?: Date;
};
