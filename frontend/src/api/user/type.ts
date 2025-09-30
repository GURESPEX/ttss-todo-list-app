import type { EndpointType } from "../type";

export type UserApi = {
  GetMe: EndpointType<void, unknown, unknown>;
  UpdateMe: EndpointType<{ username: string; password: string }, unknown, unknown>;
  DeleteMe: EndpointType<void, unknown, unknown>;
};
