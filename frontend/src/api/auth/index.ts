import api from "..";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
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
    login: build.mutation({
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
    logout: build.mutation({
      query: () => {
        return {
          url: "/logout",
          method: "post",
        };
      },
    }),
  }),
  overrideExisting: "throw",
});

export { authApi };
