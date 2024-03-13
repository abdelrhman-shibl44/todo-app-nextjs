"use client";

import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import Button from "./Button";

const DashboardForm = () => {
  const { data: session, status, update } = useSession();
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

  if (status === "loading")
    return (
      <div className="flex items-center justify-center dark:text-slate-50 font-semibold">
        Loading...
      </div>
    );

  return (
    status === "authenticated" && (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="name"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Type Your New Name"
        />
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Type Your New Email"
        />
        <Button
          type="submit"
          disabled={isFormLoading}
          isFormLoading={isFormLoading}
          text="Update"
        />
      </form>
    )
  );
};

export default DashboardForm;
