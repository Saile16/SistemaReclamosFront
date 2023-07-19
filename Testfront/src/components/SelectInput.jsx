// Componente de selección
import React from "react";

const SelectInput = ({ options, label, ...otherOptions }) => {
  return (
    <div
      className={`flex flex-col ${
        label == "Almacen" ? "col-span-1 w-2/6" : ""
      }`}
    >
      <label className="text-left mb-2 text-gray-500 font-bold text-base">
        {label}
      </label>
      <div className="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
        <select
          className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
          {...otherOptions}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
