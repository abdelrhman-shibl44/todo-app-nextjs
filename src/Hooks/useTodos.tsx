import axios from "axios";
import React, { useEffect, useState } from "react";
import { TodoItem } from "@/Types.common";
const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`api?limit=${limit}`);
      setTodos(data.todos);
    })();
  }, []);

  return { todos, setTodos };
};
export default useTodos;
