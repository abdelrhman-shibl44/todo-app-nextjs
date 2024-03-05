import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { TodoItem } from "@/Types.common";
type Todos = {
  id: number;
  onDelete: (mongoId: string) => void;
  onUpdate: (mongoId: string) => void;
} & TodoItem;

const Todo = (props: Todos) => {
  const handleUpdate = async (mongoId: string) => {
    try {
      const { data } = await axios.put(
        "/api",
        {},
        {
          params: { mongoId },
        }
      );
      if (data) {
        toast.success(data.msg);
        props.onUpdate(mongoId);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  const handleDelete = async (mongoId: string) => {
    try {
      const { data } = await axios.delete("/api", {
        params: { mongoId },
      });
      if (data) {
        toast.success(data.msg);
        props.onDelete(mongoId);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  return (
    <tr className="bg-white border dark:bg-gray-800/80 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap dark:text-white"
      >
        {props.id + 1}
      </th>
      <td
        className={props.isCompleted ? "line-through px-6 py-4" : "px-6 py-4"}
      >
        {props.title}
      </td>
      <td
        className={props.isCompleted ? "line-through px-6 py-4" : "px-6 py-4"}
      >
        {props.description}
      </td>
      <td className="px-6 py-4">{props.isCompleted ? "Done 😇" : "pending"}</td>
      <td className="px-6 py-4 flex gap-3">
        <button
          onClick={() => handleDelete(props._id)}
          className="text-orange-400  hover:text-red-500 border border-orange-200 hover:border-red-400 py-1 px-4 transition-all"
        >
          Delete
        </button>
        <button
          disabled={props.isCompleted}
          onClick={() => handleUpdate(props._id)}
          className={
            props.isCompleted
              ? "text-gray-200 dark:text-gray-500 dark-gray-600 border border-gray-200 dark:border-gray-600 px-4"
              : "text-green-300  hover:text-green-500 border border-green-200 hover:border-green-400 py-1 px-4 transition-all"
          }
        >
          Done
        </button>
      </td>
    </tr>
  );
};

export default Todo;
