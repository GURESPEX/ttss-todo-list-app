import api from "..";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: "throw",
});

export default authApi;
