"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Input from "../Input";
import Button from "../Button";
import LoginProviders from "./LoginProviders";

const LoginForm = () => {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return toast.error("All fields are required");

    try {
      setIsFormLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        return toast.error(res?.error);
      }
      toast.success("You Logged in successfully");
      router.replace("/dashboard");
      router.refresh();
    } catch (err: any) {
      setIsFormLoading(false);
      console.log(err.response);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          onChange={handleChange}
          value={formData.password}
        />
        <span className="text-center dark:text-slate-50">
          Don&apos;t have an account?
          <Link
            className="text-blue-500 border-b-2 border-blue-500"
            href="/Auth/register"
          >
            {" "}
            Register
          </Link>
        </span>
        <Button
          type="submit"
          className={`w-fit mx-auto bg-slate-100 hover:shadow-lg shadow-slate-900  dark:bg-slate-700  text-slate-700 dark:text-white font-semibold p-2 px-6 rounded-md ${
            isFormLoading ? "opacity-50" : ""
          }`}
          disabled={isFormLoading}
          isFormLoading={isFormLoading}
          text="Submit"
        />
      </form>
      <LoginProviders />
    </>
  );
};

export default LoginForm;
