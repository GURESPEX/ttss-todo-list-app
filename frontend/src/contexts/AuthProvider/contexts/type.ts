import type { Dispatch, SetStateAction } from "react";

export type AuthProviderState = { username: string; access_token: string } | undefined;

export type AuthContextValue = { state: AuthProviderState; setState: Dispatch<SetStateAction<AuthProviderState>> };
