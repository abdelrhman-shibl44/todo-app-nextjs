"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Input from "../Input";
import Button from "../Button";

const RegisterForm = () => {
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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
    const { name, email, password } = formData;
    if (!name || !email || !password)
      return toast.error("All fields are required");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return setFormError("invaild email");
    }

    try {
      setIsFormLoading(true);
      const { data } = await axios.post("/api/register", formData);
      if (data) {
        console.log("Successfully registered");
        setFormData({ name: "", email: "", password: "" });
        setFormError("");
        router.push("/Auth/login");
        return toast.success("you registered successfuly");
      }
    } catch (err: any) {
      setIsFormLoading(false);
      console.log(err.response);
      setFormError(err.response.data);
    } finally {
      setIsFormLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <Input
        type="name"
        name="name"
        id="name"
        placeholder="Enter your Name"
        onChange={handleChange}
        value={formData.name}
      />
      <Input
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
      <p className="text-red-500 font-semibold text-sm">
        {formError.length > 0 && formError}
      </p>
      <span className="text-center dark:text-slate-50">
        Already have an account?
        <Link
          className="text-blue-500 border-b-2 border-blue-500"
          href="/Auth/login"
        >
          {" "}
          Login
        </Link>
      </span>
      <Button
        type="submit"
        disabled={isFormLoading}
        isFormLoading={isFormLoading}
        className={`w-fit mx-auto hover:shadow-lg shadow-slate-900 transition-shadow duration-300
        bg-slate-100 dark:bg-slate-700  text-slate-700 dark:text-white font-semibold p-2 px-6 rounded-md ${
          isFormLoading ? "opacity-50" : ""
        }`}
        text="Submit"
      />
    </form>
  );
};

export default RegisterForm;
