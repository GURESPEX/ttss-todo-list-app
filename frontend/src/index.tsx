import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./contexts/AuthProvider";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import api from "./api";
import App from "./app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ApiProvider api={api}>
        <App />
      </ApiProvider>
    </AuthProvider>
  </StrictMode>,
);
