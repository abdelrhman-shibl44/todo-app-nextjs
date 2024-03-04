import axios from "axios";
import { useEffect, useState } from "react";
import { TodoItem } from "@/Types.common";
const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [limit, setLimit] = useState<number>(5);
  const [isTodosLoaded, setIsTodosLoaded] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`api?limit=${limit}`);
        setTodos(data.todos);
        setIsTodosLoaded(data.AllTodosLoaded);
      } catch (err) {
        setIsLoadingMore(false);
      } finally {
        setIsLoadingMore(false);
      }
    })();
  }, [limit]);

  const handleLoadMore = (count: number) => {
    setLimit((prev) => prev + count);
    setIsLoadingMore(true);
  };
  return { todos, setTodos, handleLoadMore, isLoadingMore, isTodosLoaded };
};
export default useTodos;
