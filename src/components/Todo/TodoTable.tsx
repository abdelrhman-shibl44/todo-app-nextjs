import React from "react";
import TodoHead from "./TodoHead";
import Todo from "./Todo";

const TodoTable = () => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-black/80 dark:text-gray-400">
          <TodoHead />
        </thead>
        <tbody>
          <Todo />
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
