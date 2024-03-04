import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TodoItem } from "@/Types.common";
const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [limit, setLimit] = useState<number>(5);
  const [isTodosLoaded, setIsTodosLoaded] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const elementRef = useRef<HTMLTableSectionElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`api?limit=${limit}`);
        setTodos(data.todos);
        setIsTodosLoaded(data.AllTodosLoaded);
        setTimeout(() => {
          if (elementRef.current) {
            elementRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }
        }, 100);
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
  return {
    todos,
    setTodos,
    handleLoadMore,
    elementRef,
    isLoadingMore,
    isTodosLoaded,
  };
};
export default useTodos;
