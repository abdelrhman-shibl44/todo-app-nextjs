"use client";
import React from "react";
import TodoForm from "./TodoForm";
import TodoTable from "./TodoTable";
import useTodos from "@/Hooks/useTodos";

const TodoList = () => {
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
      <TodoForm setTodos={setTodos} />
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
