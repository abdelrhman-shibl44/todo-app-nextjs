import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../Button";

type AuthLinksProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthLinks = ({ setSidebarOpen }: AuthLinksProps) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-4">
      {session && status === "authenticated" ? (
        <Button
          disabled={loading}
          isFormLoading={loading}
          onClick={handleLogout}
          text="Logout"
        />
      ) : (
        <>
          <Link
            onClick={() => setSidebarOpen(false)}
            className="bg-slate-50 dark:bg-slate-900 hover:border-t-2 border-orange-500 md:p-2 rounded-md"
            href={"/Auth/register"}
          >
            Register
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            className="bg-slate-50 dark:bg-slate-900 hover:border-t-2 border-orange-500 md:p-2 rounded-md"
            href={"/Auth/login"}
          >
            LogIn
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
