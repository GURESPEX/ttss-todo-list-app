import api from "..";
import type { AuthApi } from "./type";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthApi["Register"]["Transformed"], AuthApi["Register"]["Request"]>({
      query: (arg) => {
        return {
          url: "/register",
          method: "post",
          body: {
            username: arg.username,
            password: arg.password,
          },
        };
      },
    }),
    login: build.mutation<AuthApi["Login"]["Transformed"], AuthApi["Login"]["Request"]>({
      query: (arg) => {
        return {
          url: "/login",
          method: "post",
          body: {
            username: arg.username,
            password: arg.password,
          },
        };
      },
    }),
    logout: build.mutation<AuthApi["Logout"]["Transformed"], AuthApi["Logout"]["Request"]>({
      query: (arg) => {
        return {
          url: "/logout",
          method: "post",
          headers: {
            Authorization: `Bearer ${arg.access_token}`,
          },
        };
      },
    }),
  }),
  overrideExisting: "throw",
});

export { authApi };
