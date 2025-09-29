import api from "..";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      providesTags: ["user"],
      query: () => {
        return {
          url: "/me",
          method: "get",
        };
      },
    }),
    updateMe: build.mutation({
      invalidatesTags: ["user"],
      query: (arg) => {
        return {
          url: `/me/${arg.id}`,
          method: "put",
          body: {
            username: arg.username,
            password: arg.password,
          },
        };
      },
    }),
    deleteMe: build.mutation({
      invalidatesTags: ["user"],
      query: (arg) => {
        return {
          url: `/me/${arg.id}`,
          method: "delete",
        };
      },
    }),
  }),
  overrideExisting: "throw",
});

export { userApi };
