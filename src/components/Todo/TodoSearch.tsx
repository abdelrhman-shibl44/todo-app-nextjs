import { TodoItem } from "@/Types.common";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
type TodoSearchProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};
const TodoSearch = ({ setTodos }: TodoSearchProps) => {
  const [searchVal, setSearchVal] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/search?query=${searchVal}`);
      setTodos(data.todos);
    })();
  }, [searchVal]);

  return (
    <div>
      <input
        className="w-full p-3 px-4 text-black bg-white/90 dark:text-white dark:bg-slate-900/90 focus:outline-none focus:border-t-2 border-orange-500"
        placeholder="Search for Todos"
        type="text"
        name="search"
        value={searchVal}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default TodoSearch;
