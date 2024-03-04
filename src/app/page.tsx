import TodoList from "@/components/Todo/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-var(--nav-h))] items-center justify-center relative">
      <div className="absolute inset-0 w-full h-full">
        <Image
          style={{ objectFit: "cover" }}
          src={"/todo-back.webp"}
          fill
          alt="todo-background"
          priority={true}
          loading="eager"
        />
        <div className="backdrop-brightness-75 absolute inset-0 w-full h-full">
          <TodoList />
        </div>
      </div>
    </section>
  );
}
