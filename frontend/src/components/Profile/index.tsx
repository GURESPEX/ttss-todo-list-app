import React from "react";
import { useAuth } from "../../contexts/AuthProvider/hooks";
import LogoutButton from "../LogoutButton";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex w-full items-center justify-between rounded-b bg-slate-800 p-2 px-4">
      <h1 className="text-lg font-bold text-slate-50 uppercase">
        <span className="inline-flex h-8 items-center rounded bg-amber-500 px-2 text-amber-800">TTSS</span>
        <span className="ml-2">TODO List</span>
      </h1>
      {user ? (
        <div className="flex items-center gap-2">
          <p className="h-8 rounded border border-slate-600 bg-slate-700 px-2 text-lg font-bold text-slate-50">{user.username}</p>
          <LogoutButton />
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(Profile);
