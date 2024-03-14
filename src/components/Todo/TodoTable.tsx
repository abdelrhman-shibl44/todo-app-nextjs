import React from "react";
import TodoHead from "./TodoHead";
import Todo from "./Todo";
import SpinnerLoading from "./SpinnerLoading";
import { TodoItem } from "@/Types.common";
import Button from "../Button";
import { useSession } from "next-auth/react";
type TableProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  todos: TodoItem[];
  handleLoadMore: (count: number) => void;
  isTodosLoaded: boolean;
  isTodosLoading: boolean;
  isLoadingMore: boolean;
  elementRef: React.LegacyRef<HTMLTableSectionElement>;
  error: boolean;
};

const TodoTable = ({
  setTodos,
  todos,
  handleLoadMore,
  isLoadingMore,
  isTodosLoaded,
  isTodosLoading,
  elementRef,
  error,
}: TableProps) => {
  const { data: session } = useSession();
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
  // check if todos loaded or loading and errors
  const checkTodos = !session
    ? "Please Login to see & create todos"
    : error
    ? "Error loading Todos"
    : todos?.length === 0
    ? "There are no todos available"
    : isTodosLoaded
    ? "All todos Loaded :)"
    : "";

  return (
    <div className="relative text-center pb-5 overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50/80 dark:bg-black/80 dark:text-gray-400">
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
            session &&
            todos &&
            todos.map((todo, idx) => (
              <Todo
                key={todo?._id}
                id={idx}
                _id={todo?._id}
                title={todo?.title}
                description={todo?.description}
                isCompleted={todo?.isCompleted}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </tbody>
      </table>
      {!isTodosLoading && checkTodos && (
        <p className="text-center text-slate-500 dark:text-slate-200 font-semibold border dark:bg-slate-800/70 border-slate-100 bg-slate-100/70 dark:border-slate-700 w-fit mx-auto p-2 px-6 rounded-b-md border-t-0">
          {checkTodos}
        </p>
      )}
      {!checkTodos && (
        <Button
          className="bg-slate-200 dark:bg-slate-800 font-semibold p-2 w-60 mx-auto rounded-b-md shadow"
          isFormLoading={isLoadingMore}
          onClick={() => handleLoadMore(5)}
          text="Load More"
        />
      )}
    </div>
  );
};

export default TodoTable;
