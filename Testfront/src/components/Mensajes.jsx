import React from "react";

const Mensajes = ({ children }) => {
  return (
    <div
      className="p-4 mb-4 text-lg text-black rounded-lg bg-red-50 mt-5"
      role="alert"
    >
      <span className="font-medium">{children}</span>
    </div>
  );
};

export default Mensajes;
