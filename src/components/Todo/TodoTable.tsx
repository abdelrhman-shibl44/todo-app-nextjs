"use client";

import React from "react";
import TodoHead from "./TodoHead";
import Todo from "./Todo";
import useTodos from "@/Hooks/useTodos";

const TodoTable = () => {
  const { todos, setTodos } = useTodos();
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
                setTodos={setTodos}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
