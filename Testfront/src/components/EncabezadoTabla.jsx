import React from "react";

const EncabezadoTabla = ({ titulo }) => {
  return (
    <th
      scope="col"
      className="px-1 py-3 text-[13px] font-bold text-center text-gray-500 uppercase "
    >
      {titulo}
    </th>
  );
};

export default EncabezadoTabla;
