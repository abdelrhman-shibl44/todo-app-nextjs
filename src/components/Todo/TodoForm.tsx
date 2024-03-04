"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
const TodoForm = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title === "" || formData.description === "") {
      return toast.error("All fields are required");
    }
    try {
      // api
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container text-white space-y-6 md:w-[50%] my-8"
    >
      <input
        className="focus:outline-none p-2 pl-2 rounded-md text-green-600 w-full"
        name="title"
        type="text"
        placeholder="Add your todos"
        value={formData.title}
        onChange={onChange}
      />
      <textarea
        className="w-full p-2 rounded-md text-blue-600 focus:outline-none"
        name="description"
        title="description"
        placeholder="description"
        value={formData.description}
        onChange={onChange}
      ></textarea>
      <button className="bg-slate-200 text-gray-800 font-semibold p-2 px-4 rounded-md ">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
