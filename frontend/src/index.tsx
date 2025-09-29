import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import api from "./api";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={api}>
      <App />
    </ApiProvider>
  </StrictMode>
);
