import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "../Button";
const AuthLinks = () => {
  const { data: session } = useSession();
  return (
    <div className="md:flex gap-4">
      {session ? (
        <Button onClick={() => signOut()} text="Logout" />
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
