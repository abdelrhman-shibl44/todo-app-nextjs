import React from "react";
import TodoHead from "./TodoHead";

const TodoTable = () => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900/80 dark:text-gray-400">
          <TodoHead />
        </thead>
      </table>
    </div>
  );
};

export default TodoTable;
