import { createContext } from "react";
import type { AuthContextValue } from "./type";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
