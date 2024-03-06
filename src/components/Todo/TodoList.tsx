"use client";
import React, { use } from "react";
import TodoForm from "./TodoForm";
import TodoTable from "./TodoTable";
import useTodos from "@/Hooks/useTodos";
import { Flip, ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";
import TodoSearch from "./TodoSearch";

const TodoList = () => {
  const { theme } = useTheme();
  const {
    todos,
    setTodos,
    handleLoadMore,
    isLoadingMore,
    isTodosLoaded,
    elementRef,
    isTodosLoading,
    error,
  } = useTodos();
  return (
    <>
      <ToastContainer
        theme={theme === "dark" ? "dark" : "light"}
        transition={Flip}
      />
      <TodoForm setTodos={setTodos} />
      <TodoSearch setTodos={setTodos} />
      <TodoTable
        setTodos={setTodos}
        todos={todos}
        handleLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
        isTodosLoaded={isTodosLoaded}
        elementRef={elementRef}
        isTodosLoading={isTodosLoading}
        error={error}
      />
    </>
  );
};

export default TodoList;
