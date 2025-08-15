import React from "react";

export default function Input({
  className,
  value,
  onChange,
  placeholder,
  id,
  type,
}) {
  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      type={type}
    ></input>
  );
}
