import type { EndpointType, ReponseResult } from "../type";

export type AuthApi = {
  Register: EndpointType<{ username: string; password: string }, unknown, ReponseResult<unknown>>;
  Login: EndpointType<{ username: string; password: string }, unknown, ReponseResult<{ access_token: string }>>;
  Logout: EndpointType<{ access_token: string }, unknown, ReponseResult<unknown>>;
  Refresh: EndpointType<void, unknown, ReponseResult<{ access_token: string }>>;
};
