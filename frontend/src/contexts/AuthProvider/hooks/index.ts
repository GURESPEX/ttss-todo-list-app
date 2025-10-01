import { useCallback, useContext } from "react";
import { AuthContext } from "../contexts";
import { authApi } from "../../../api/auth";

export const useAuthState = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuthState must used inside of AuthProvider");
  }

  const [callLogout] = authApi.useLogoutMutation();

  const logout = useCallback(async () => {
    if (value.state) {
      await callLogout({ access_token: value.state.access_token });
    }
    value.setState(undefined);
  }, [callLogout, value]);

  return {
    user: value.state,
    setUser: value.setState,
    logout,
  };
};
