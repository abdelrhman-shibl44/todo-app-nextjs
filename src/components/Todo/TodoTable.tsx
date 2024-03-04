"use client";

import React from "react";
import TodoHead from "./TodoHead";
import Todo from "./Todo";
import useTodos from "@/Hooks/useTodos";
import SpinnerLoading from "./SpinnerLoading";

const TodoTable = () => {
  const { todos, setTodos, handleLoadMore, isLoadingMore, isTodosLoaded } =
    useTodos();

  const handleDelete = (id: string) => {
    setTodos((prev) =>
      prev.filter((todo) => {
        return todo._id !== id;
      })
    );
  };
  const handleUpdate = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo._id === id) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      })
    );
  };
  const checkTodos =
    todos.length === 0
      ? "There are no todos available"
      : isTodosLoaded
      ? "All todos Loaded :)"
      : "";
  return (
    <div className="relative text-center overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-black/80 dark:text-gray-400">
          <TodoHead />
        </thead>
        <tbody>
          {todos &&
            todos.map((todo, idx) => (
              <Todo
                key={todo._id}
                id={idx}
                _id={todo._id}
                title={todo.title}
                description={todo.description}
                isCompleted={todo.isCompleted}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
        </tbody>
      </table>
      {checkTodos && (
        <p className="text-center text-gray-500 dark:text-gray-100 border border-slate-100 w-fit mx-auto p-2 px-4 rounded-b-md">
          {checkTodos}
        </p>
      )}
      {!checkTodos && (
        <button
          onClick={() => handleLoadMore(5)}
          className="bg-slate-200 font-semibold p-2 w-60 mx-auto rounded-b-md"
        >
          {isLoadingMore ? <SpinnerLoading /> : "Load More"}
        </button>
      )}
    </div>
  );
};

export default TodoTable;
