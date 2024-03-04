"use client";

import React from "react";
import TodoHead from "./TodoHead";
import Todo from "./Todo";
import useTodos from "@/Hooks/useTodos";

const TodoTable = () => {
  const { todos, setTodos } = useTodos();

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
  return (
    <div className="relative overflow-x-auto">
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
    </div>
  );
};

export default TodoTable;
