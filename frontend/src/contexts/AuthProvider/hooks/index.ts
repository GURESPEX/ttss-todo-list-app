import { useCallback, useContext, useLayoutEffect, useMemo } from "react";
import { AuthContext } from "../contexts";
import { authApi } from "../../../api/auth";
import { userApi } from "../../../api/user";
import type { AuthApi } from "../../../api/auth/type";
import type { AuthProviderState } from "../contexts/type";

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must used inside of AuthProvider");
  }

  const state = useMemo(() => value.state, [value.state]);
  const setState = useMemo(() => value.setState, [value.setState]);

  const [callGetMe, { isLoading: isUserLoading, isFetching: isUserFetching }] = userApi.useLazyGetMeQuery();

  const [callLogin, loginState] = authApi.useLoginMutation();

  const [callLogout, logoutState] = authApi.useLogoutMutation();

  const [callRefresh, refreshState] = authApi.useRefreshMutation();

  // Refresh token

  const _getUsernameAndAccessTokenByRefreshToken = useCallback(async () => {
    const { data: refreshData, error: refreshError } = await callRefresh();
    if (refreshError || !refreshData) {
      return;
    }
    const { data: userData, error: getMeError } = await callGetMe({ access_token: refreshData.result.access_token });
    if (getMeError || !userData) {
      return;
    }
    return { access_token: refreshData.result.access_token, username: userData.result.username };
  }, [callGetMe, callRefresh]);

  const refresh = useCallback(
    async (callback?: (user: Exclude<AuthProviderState, undefined>) => Promise<boolean | undefined> | boolean | undefined) => {
      if (!callback) {
        const user = await _getUsernameAndAccessTokenByRefreshToken();
        setState(user);
        return;
      }

      if (!state) {
        return;
      }

      const isAccessTokenExpired = await callback(state);

      if (isAccessTokenExpired ?? true) {
        return;
      }

      const user = await _getUsernameAndAccessTokenByRefreshToken();

      if (!user) {
        return;
      }

      await callback?.(user);
      setState(user);
    },
    [_getUsernameAndAccessTokenByRefreshToken, setState, state],
  );

  // Login

  const login = useCallback(
    async (data: AuthApi["Login"]["Request"]) => {
      const { data: loginData, error: loginError } = await callLogin({
        username: data.username,
        password: data.password,
      });
      if (loginError || !loginData) {
        return { error: loginError };
      }
      const { data: userData, error: getMeError } = await callGetMe({ access_token: loginData.result.access_token });
      if (getMeError || !userData) {
        return { error: getMeError };
      }
      setState({ access_token: loginData.result.access_token, username: userData.result.username });
    },
    [callGetMe, callLogin, setState],
  );

  // Logout

  const logout = useCallback(async () => {
    if (!state) {
      return;
    }

    const user = await _getUsernameAndAccessTokenByRefreshToken();

    if (!user) {
      return;
    }

    const { error: logoutError } = await callLogout({ access_token: user.access_token });
    if (logoutError) {
      return;
    }
    setState(undefined);
  }, [callLogout, _getUsernameAndAccessTokenByRefreshToken, setState, state]);

  // Effect handler

  useLayoutEffect(() => {
    if (!state) {
      refresh();
    }
  }, [refresh, state]);

  return {
    user: state,
    isUserLoading: isUserLoading || isUserFetching,
    setUser: setState,
    loginHandler: {
      login,
      loginState,
    },
    logoutHandler: {
      logout,
      logoutState,
    },
    refreshHandler: {
      refresh,
      refreshState,
    },
  };
};
