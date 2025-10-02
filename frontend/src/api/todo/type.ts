import type { EndpointType, ReponseResult } from "../type";

export type TodoApi = {
  GetAll: EndpointType<{ access_token: string }, unknown, ReponseResult<Todo[]>>;
  GetById: EndpointType<{ access_token: string; id: string }, unknown, ReponseResult<Todo>>;
  Create: EndpointType<{ access_token: string; title?: string; content: string }, unknown, ReponseResult<Todo>>;
  Update: EndpointType<{ access_token: string; id: string; title?: string; content: string; is_done: boolean }, unknown, ReponseResult<Todo>>;
  Delete: EndpointType<{ access_token: string; id: string }, unknown, ReponseResult<Todo>>;
};

export type Todo = {
  id: string;
  title: string;
  content: string;
  is_done: boolean;
  created_at: string;
  updated_at: string;
};
