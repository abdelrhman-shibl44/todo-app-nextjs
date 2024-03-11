import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthLinks = () => {
  const { data: session } = useSession();
  return (
    <div className="md:flex gap-4">
      {session ? (
        <button
          className="bg-slate-50 hover:border-t-2 border-orange-500 dark:bg-slate-900 md:p-2 rounded-md cursor-pointer"
          onClick={() => signOut()}
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            className="bg-slate-50 dark:bg-slate-900 hover:border-t-2 border-orange-500 p-2 rounded-md"
            href={"/Auth/register"}
          >
            Register
          </Link>
          <Link
            className="bg-slate-50 dark:bg-slate-900 hover:border-t-2 border-orange-500 p-2 rounded-md"
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
