import React from "react";
type InputProps = {
  className?: string;
  type?: string;
  name: string;
  id: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};
const Input = (props: InputProps) => {
  return (
    <input
      className={
        props.className
          ? props.className
          : "p-2 rounded-md dark:bg-slate-800 w-full outline-none focus:border-t-2 border-orange-500 dark:text-white"
      }
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default Input;
