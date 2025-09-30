import api from "..";
import type { UserApi } from "./type";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<UserApi["GetMe"]["Transformed"], UserApi["GetMe"]["Request"]>({
      providesTags: ["user"],
      query: () => {
        return {
          url: "/me",
          method: "get",
        };
      },
    }),
    updateMe: build.mutation<UserApi["UpdateMe"]["Transformed"], UserApi["UpdateMe"]["Request"]>({
      invalidatesTags: ["user"],
      query: (arg) => {
        return {
          url: "/me",
          method: "put",
          body: {
            username: arg.username,
            password: arg.password,
          },
        };
      },
    }),
    deleteMe: build.mutation<UserApi["DeleteMe"]["Transformed"], UserApi["DeleteMe"]["Request"]>({
      invalidatesTags: ["user"],
      query: () => {
        return {
          url: "/me",
          method: "delete",
        };
      },
    }),
  }),
  overrideExisting: "throw",
});

export { userApi };
