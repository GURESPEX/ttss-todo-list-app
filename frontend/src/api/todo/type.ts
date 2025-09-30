import type { EndpointType } from "../type";

export type TodoApi = {
  GetAll: EndpointType<void, unknown, unknown>;
  GetById: EndpointType<{ id: string }, unknown, unknown>;
  Create: EndpointType<{ title?: string; content: string }, unknown, unknown>;
  Update: EndpointType<{ id: string; title?: string; content: string; is_done: string }, unknown, unknown>;
  Delete: EndpointType<{ id: string }, unknown, unknown>;
};
