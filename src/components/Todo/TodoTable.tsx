"use client";

import React from "react";
import TodoHead from "./TodoHead";
import Todo from "./Todo";
import useTodos from "@/Hooks/useTodos";
import SpinnerLoading from "./SpinnerLoading";

const TodoTable = () => {
  const {
    todos,
    elementRef,
    setTodos,
    handleLoadMore,
    isLoadingMore,
    isTodosLoaded,
    isTodosLoading,
  } = useTodos();
  // Delete todo
  const handleDelete = (id: string) => {
    setTodos((prev) =>
      prev.filter((todo) => {
        return todo._id !== id;
      })
    );
  };
  // update todo
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
  // check if todos loaded or loading
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
        <tbody className="text-center w-fit mx-auto" ref={elementRef}>
          {isTodosLoading ? (
            <tr className="bg-white border-b mx-auto w-fit text-center  dark:bg-gray-800/80 dark:border-gray-700">
              <td
                colSpan={6}
                className="w-fit mx-auto text-center p-2 overflow-hidden"
              >
                <SpinnerLoading />
              </td>
            </tr>
          ) : (
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
            ))
          )}
        </tbody>
      </table>
      {!isTodosLoading && checkTodos && (
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
