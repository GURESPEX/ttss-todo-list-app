import type { EndpointType, ReponseResult } from "../type";

export type UserApi = {
  GetMe: EndpointType<{ access_token: string }, unknown, ReponseResult<{ id: string; username: string; created_at: string; updated_at: string }>>;
  UpdateMe: EndpointType<{ access_token: string; username: string; password: string }, unknown, ReponseResult<{ id: string; username: string; created_at: string; updated_at: string }>>;
  DeleteMe: EndpointType<{ access_token: string }, unknown, ReponseResult<{ id: string; username: string; created_at: string; updated_at: string }>>;
};
