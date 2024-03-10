"use client";

import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoading from "./Todo/SpinnerLoading";

const DashboardForm = () => {
  const { data: session, update } = useSession();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      session?.user?.name == formData.name &&
      session?.user?.email == formData.email
    ) {
      return toast.error("Please change your info first.");
    }
    try {
      setIsFormLoading(true);
      const updatedUser = await update({
        name: formData.name,
        email: formData.email,
      });
      if (updatedUser) {
        setIsFormLoading(false);
        return toast.success("Your info has been updated");
      }
    } catch (err: any) {
      console.log(err);
      setIsFormLoading(false);
      throw new Error(err);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="p-2 rounded-md dark:bg-slate-800 w-full outline-none focus:border-t-2 border-orange-500 dark:text-white"
        type="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Type Your New Name"
      />
      <input
        className="p-2 rounded-md dark:bg-slate-800 w-full outline-none focus:border-t-2 border-orange-500 dark:text-white"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Type Your New Email"
      />

      <button
        type="submit"
        className={`w-fit mx-auto bg-slate-100 hover:shadow-lg shadow-slate-900  dark:bg-slate-700  text-slate-700 dark:text-white font-semibold p-2 px-6 rounded-md ${
          isFormLoading ? "opacity-50" : ""
        }`}
        disabled={isFormLoading}
      >
        {isFormLoading ? <SpinnerLoading /> : "Update"}
      </button>
    </form>
  );
};

export default DashboardForm;
