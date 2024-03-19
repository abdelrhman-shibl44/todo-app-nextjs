"use client";

import Card from "@/components/Auth/Card";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SpinnerLoading from "@/components/Todo/SpinnerLoading";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setLoading(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <Card title="Activate Account">
      <h1 className="text-4xl"></h1>
      <div className="text-center dark:text-slate-50 mx-auto w-fit flex flex-col gap-4">
        {loading && <SpinnerLoading />}
        {verified && (
          <>
            <Image
              className="text-center mx-auto"
              width={64}
              height={64}
              src="/check-mark.png"
              alt="checkmark"
            />
            <h2 className="text-2xl">Email Verified</h2>
            <p>Your email address was successfuly verified</p>
            <Link
              className="font-bold bg-slate-50 dark:bg-slate-800 rounded-md p-2 px-4 mx-auto w-full text-center shadow-lg hover:shadow-slate-700/50 dark:hover:shadow-orange-500/50 duration-300"
              href="/Auth/login"
            >
              Login
            </Link>
          </>
        )}
      </div>

      {error && (
        <div className="text-2xl text-center rounded-md dark:text-slate-50 font-semibold bg-orange-500/80  dark:bg-orange-500/20 p-4 relative">
          <h2 className="backdrop-blur-lg z-10 w-full h-full inset-0 absolute">
            <span className="">Error</span>
          </h2>
        </div>
      )}
    </Card>
  );
}
