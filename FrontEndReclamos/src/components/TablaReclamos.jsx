import { useEffect, useState } from "react";
import FilaTablaReclamo from "./FilaTablaReclamo";
import ReclamosContext from "../context/ReclamosProvider";
import useReclamos from "../hooks/useReclamos";
import Spinner from "./Spinner";

const TablaReclamos = () => {
  const { listarReclamos, reclamos, loading, error } = useReclamos();
  useEffect(() => {
    listarReclamos();
  }, []);

  const [filtroCodigo, setFiltroCodigo] = useState("");
  if (loading) return <Spinner />;
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
            >
              Código Reclamo
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
            >
              F. Recepción
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
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
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
            >
              F. Respuesta Operaciones
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
            >
              F. Respuesta Legal
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
            >
              F. Recepción Cliente
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
            >
              Fecha de Cierre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
            >
              Tiempo Total Transcurrido
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reclamos.map((reclamo) => (
            <FilaTablaReclamo reclamo={reclamo} key={reclamo.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablaReclamos;
