import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex text-center justify-center items-center border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-red-800 mt-6" />
    </div>
  );
};

export default Spinner;
