import type { EndpointType, ReponseResult } from "../type";

export type UserApi = {
  GetMe: EndpointType<{ access_token: string }, unknown, ReponseResult<User>>;
  UpdateMe: EndpointType<{ access_token: string; username: string; password: string }, unknown, ReponseResult<User>>;
  DeleteMe: EndpointType<{ access_token: string }, unknown, ReponseResult<User>>;
};

export type User = { id: string; username: string; created_at: string; updated_at: string };
