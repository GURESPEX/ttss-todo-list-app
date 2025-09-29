import api from "..";

const todoApi = api.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: "throw",
});

export default todoApi;
