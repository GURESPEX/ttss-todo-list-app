import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "../env";

const api = createApi({
  tagTypes: ["user", "todo"],
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  endpoints: () => ({}),
});

export default api;
