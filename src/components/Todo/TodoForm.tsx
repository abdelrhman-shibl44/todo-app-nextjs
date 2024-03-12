"use client";

import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoading from "./SpinnerLoading";
import { TodoItem } from "@/Types.common";
import Input from "@/components/Input";

const TodoForm = ({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

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
    (async () => {
      try {
        setSubmitLoading(true);
        const { data } = await axios.post("/api", formData);
        if (data) {
          toast.success(data.msg);
          setTodos((prev) => [...prev, data.createdTodo]);
          setFormData({ title: "", description: "" });
        }
      } catch (error) {
        console.log(error);
        setSubmitLoading(false);
      } finally {
        setSubmitLoading(false);
      }
    })();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container text-white space-y-6 md:w-[50%] my-8"
    >
      <Input
        className="focus:outline-none p-2 pl-2 rounded-md text-green-600 dark:text-green-300 focus:border-t-2 border-green-400 dark:bg-slate-800 w-full"
        id="title"
        name="title"
        type="text"
        placeholder="Add title"
        value={formData.title}
        onChange={onChange}
      />
      <textarea
        className="w-full p-2 rounded-md text-blue-600 dark:text-blue-300 focus:border-t-2 border-blue-600 dark:bg-slate-800  focus:outline-none"
        name="description"
        title="description"
        placeholder="description"
        value={formData.description}
        onChange={onChange}
      ></textarea>
      <button className="bg-slate-200 text-gray-800 dark:text-slate-50 dark:bg-slate-800 font-semibold p-2 px-4 rounded-md shadow">
        {submitLoading ? <SpinnerLoading /> : "Submit"}
      </button>
    </form>
  );
};

export default TodoForm;
