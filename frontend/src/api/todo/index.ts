import api from "..";

const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAll: build.query({
      providesTags: ["todo"],
      query: () => {
        return {
          url: "/todos",
          method: "get",
        };
      },
    }),
    getById: build.query({
      providesTags: (_result, _error, arg) => [{ type: "todo", id: arg.id }],
      query: (arg) => {
        return {
          url: `/todos/${arg.id}`,
          method: "get",
        };
      },
    }),
    create: build.mutation({
      invalidatesTags: ["todo"],
      query: (arg) => {
        return {
          url: "/todos",
          method: "post",
          body: {
            title: arg.title,
            content: arg.content,
          },
        };
      },
    }),
    update: build.mutation({
      invalidatesTags: (_result, _error, arg) => [{ type: "todo", id: arg.id }],
      query: (arg) => {
        return {
          url: `/todos/${arg.id}`,
          method: "put",
          body: {
            title: arg.title,
            content: arg.content,
            is_done: arg.is_done,
          },
        };
      },
    }),
    delete: build.mutation({
      invalidatesTags: ["todo"],
      query: (arg) => {
        return {
          url: `/todos/${arg.id}`,
          method: "delete",
        };
      },
    }),
  }),
  overrideExisting: "throw",
});

export { todoApi };
