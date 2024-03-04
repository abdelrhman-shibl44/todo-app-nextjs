import React from "react";

const Todo = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800/80 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap dark:text-white"
      >
        1
      </th>
      <td className="px-6 py-4">fist todo</td>
      <td className="px-6 py-4">this is the first todo</td>
      <td className="px-6 py-4">pending</td>
      <td className="px-6 py-4 flex gap-3">
        <button className="text-orange-400  hover:text-red-500 border border-orange-200 hover:border-red-400 py-1 px-4 transition-all">
          Delete
        </button>
        <button className="text-green-300  hover:text-green-500 border border-green-200 hover:border-green-400 py-1 px-4 transition-all">
          Done
        </button>
      </td>
    </tr>
  );
};

export default Todo;
