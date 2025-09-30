import api from "..";
import type { TodoApi } from "./type";

const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAll: build.query<TodoApi["GetAll"]["Transformed"], TodoApi["GetAll"]["Request"]>({
      providesTags: ["todo"],
      query: () => {
        return {
          url: "/todos",
          method: "get",
        };
      },
    }),
    getById: build.query<TodoApi["GetById"]["Transformed"], TodoApi["GetById"]["Request"]>({
      providesTags: (_result, _error, arg) => [{ type: "todo", id: arg.id }],
      query: (arg) => {
        return {
          url: `/todos/${arg.id}`,
          method: "get",
        };
      },
    }),
    create: build.mutation<TodoApi["Create"]["Transformed"], TodoApi["Create"]["Request"]>({
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
    update: build.mutation<TodoApi["Update"]["Transformed"], TodoApi["Update"]["Request"]>({
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
    delete: build.mutation<TodoApi["Delete"]["Transformed"], TodoApi["Delete"]["Request"]>({
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
