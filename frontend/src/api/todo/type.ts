import type { EndpointType, ReponseResult } from "../type";

export type TodoApi = {
  GetAll: EndpointType<{ access_token: string }, unknown, ReponseResult<unknown>>;
  GetById: EndpointType<{ access_token: string; id: string }, unknown, ReponseResult<unknown>>;
  Create: EndpointType<{ access_token: string; title?: string; content: string }, unknown, ReponseResult<unknown>>;
  Update: EndpointType<{ access_token: string; id: string; title?: string; content: string; is_done: string }, unknown, ReponseResult<unknown>>;
  Delete: EndpointType<{ access_token: string; id: string }, unknown, ReponseResult<unknown>>;
};
