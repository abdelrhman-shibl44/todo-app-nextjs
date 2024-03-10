import React from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="flex flex-col justify-center bg-slate-200 dark:bg-slate-100 min-w-full md:min-w-[31.25rem] md:min-h-[18.75rem] text-slate-800 rounded-md p-6">
      <div className="flex-0 p-2 pb-4 text-center text-head_two">
        <h2 className="font-semibold ">{title}</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center">{children}</div>
    </div>
  );
};

export default Card;
