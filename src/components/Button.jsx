import React from "react";

export default function Button({ className, name, type }) {
  return (
    <button className={className} type={type}>
      {name}
    </button>
  );
}
