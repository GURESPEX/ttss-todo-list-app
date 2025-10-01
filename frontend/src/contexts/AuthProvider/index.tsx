import { useState } from "react";
import type { AuthProviderProps } from "./type";
import type { AuthProviderState } from "./contexts/type";
import { AuthContext } from "./contexts";

const AuthProvider = (props: AuthProviderProps) => {
  const [state, setState] = useState<AuthProviderState>(undefined);
  return <AuthContext value={{ state, setState }}>{props.children}</AuthContext>;
};

export default AuthProvider;
