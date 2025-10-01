import api from "..";
import type { UserApi } from "./type";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<UserApi["GetMe"]["Transformed"], UserApi["GetMe"]["Request"]>({
      providesTags: ["user"],
      query: (arg) => {
        return {
          url: "/me",
          method: "get",
          headers: {
            Authorization: `Bearer ${arg.access_token}`,
          },
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
          headers: {
            Authorization: `Bearer ${arg.access_token}`,
          },
        };
      },
    }),
    deleteMe: build.mutation<UserApi["DeleteMe"]["Transformed"], UserApi["DeleteMe"]["Request"]>({
      invalidatesTags: ["user"],
      query: (arg) => {
        return {
          url: "/me",
          method: "delete",
          headers: {
            Authorization: `Bearer ${arg.access_token}`,
          },
        };
      },
    }),
  }),
  overrideExisting: "throw",
});

export { userApi };
