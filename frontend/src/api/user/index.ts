import api from "..";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: "throw",
});

export default userApi;
