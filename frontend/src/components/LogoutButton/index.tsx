import React, { useCallback } from "react";
import { useAuth } from "../../contexts/AuthProvider/hooks";
import Button from "../ui/Button";
import type { ButtonProps } from "../ui/Button/type";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { logoutHandler } = useAuth();

  const handleClickLogout = useCallback<Exclude<ButtonProps["onClick"], undefined>>(async () => {
    await logoutHandler.logout();
  }, [logoutHandler]);

  return <Button variant="text" loading={logoutHandler.logoutState.isLoading} onClick={handleClickLogout} icon={<LogOut />} />;
};

export default React.memo(LogoutButton);
