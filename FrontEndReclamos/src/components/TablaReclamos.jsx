import { useEffect, useState } from "react";
import FilaTablaReclamo from "./FilaTablaReclamo";

const TablaReclamos = ({ reclamosLista }) => {
  console.log(reclamosLista);
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-left text-gray-500 uppercase "
            >
              C. de Reclamo
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-left text-gray-500 uppercase "
            >
              F. Recepción
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-left text-gray-500 uppercase "
            >
              F. Envio
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
            >
              F. Respuesta Seguridad
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
            >
              F. Respuesta Operaciones
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
            >
              F. Fecha Cita
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
            >
              Con video?
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
            >
              Dias Restantes
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
            >
              Fecha de Cierre
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reclamosLista.map((reclamo) => (
            <FilaTablaReclamo reclamo={reclamo} key={reclamo.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablaReclamos;
