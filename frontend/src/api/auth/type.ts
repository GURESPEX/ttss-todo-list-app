import type { EndpointType } from "../type";

export type AuthApi = {
  Register: EndpointType<{ username: string; password: string }, unknown, unknown>;
  Login: EndpointType<{ username: string; password: string }, unknown, unknown>;
  Logout: EndpointType<void, unknown, unknown>;
};
