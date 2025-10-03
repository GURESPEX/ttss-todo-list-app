import dayjs from "dayjs";
import Generator from "../../utils/generator";

export default abstract class UserRepository {
  private static _users: User[] = [];

  public static getAll = async (): Promise<User[]> => {
    return this._users;
  };

  public static findAllByField = async <T extends keyof User>(
    field: T,
    value: User[T]
  ): Promise<User[]> => {
    return this._users.filter((user) => user[field] === value);
  };

  public static findByField = async <T extends keyof User>(
    field: T,
    value: User[T]
  ): Promise<User | undefined> => {
    const foundUser = this._users.find((user) => user[field] === value);
    if (!foundUser) return foundUser;
    return foundUser;
  };

  public static create = async (
    payload: Omit<User, "id" | "created_at" | "updated_at">
  ): Promise<User> => {
    const dateNow = dayjs().toDate();
    const createdUser: User = {
      ...payload,
      id: Generator.UUID(),
      created_at: dateNow,
    };
    this._users = [...this._users, createdUser];
    return createdUser;
  };

  public static update = async (
    payload: Omit<User, "created_at" | "updated_at">
  ): Promise<User | undefined> => {
    const dateNow = dayjs().toDate();
    const foundUserIndex = this._users.findIndex(
      (user) => user.id === payload.id
    );
    if (foundUserIndex < 0) {
      return undefined;
    }
    const updatedUser = {
      ...this._users[foundUserIndex],
      ...payload,
      updated_at: dateNow,
    };
    this._users[foundUserIndex] = updatedUser;
    return updatedUser;
  };

  public static deleteByField = async <T extends keyof User>(
    field: T,
    value: User[T]
  ): Promise<User | undefined> => {
    const foundUserIndex = this._users.findIndex(
      (user) => user[field] === value,
      []
    );
    const deletedUser = this._users.splice(foundUserIndex, 1)[0];
    return deletedUser;
  };

  public static deleteRangeByField = async <T extends keyof User>(
    field: T,
    value: User[T]
  ): Promise<User[]> => {
    const usersAfterDeleted = this._users.reduce<User[]>((result, user) => {
      if (user[field] === value) return result;
      return [...result, user];
    }, []);
    this._users = usersAfterDeleted;
    return usersAfterDeleted;
  };
}

export type User = {
  id: string;
  username: string;
  hashed_password: string;
  created_at: Date;
  updated_at?: Date;
};
