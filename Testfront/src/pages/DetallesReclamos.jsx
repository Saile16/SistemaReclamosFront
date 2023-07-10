import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { format } from "date-fns";
const DetallesReclamos = () => {
  const [loading, setLoading] = useState(false);
  const [reclamos, setReclamos] = useState([]);
  const [error, setError] = useState({
    error: false,
    mensaje: "",
  });

  const listarReclamos = async (fechaInicio = "", fechaFin = "") => {
    setLoading(true);
    if (fechaInicio === "" && fechaFin == "") {
      try {
        const response = await axios.get("http://localhost:8080/api/listar");
        setReclamos(response.data);

        setError({ error: false, mensaje: "" });
      } catch (error) {
        console.error("Error:", error);
        setError({
          error: true,
          mensaje: "No se encontraron datos en esas fechas",
        });
        setLoading(false);
      }
      setLoading(false);
    } else {
      handleFiltarPorFecha(fechaInicio, fechaFin);
    }
  };
  console.log(reclamos);
  useEffect(() => {
    listarReclamos();
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className="overflow-x-auto">
      <div className="p-1.5 w-auto inline-block align-middle">
        <div className="overflow-hidden border rounded-lg">
          <table className="table-fixed">
            <thead className="bg-gray-50">
              <tr className="">
                <th
                  scope="col"
                  className="w-auto px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
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
                  Envío
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
                >
                  Respuesta Seguridad
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
                >
                  Operaciones
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
                >
                  Legal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
                >
                  Recepción Cliente
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
                >
                  Tiempo Transcurrido
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reclamos.map((reclamo) => (
                <tr key={reclamo.id}>
                  <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                    {reclamo.codigo}
                  </td>
                  <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                    {format(
                      new Date(reclamo.fechaRecepcion),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </td>
                  <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                    {format(new Date(reclamo.fechaEnvio), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                    {format(
                      new Date(reclamo.fechaRespSeguridad),
                      "dd/MM/yyyy HH:mm"
                    )}
                    - UserName
                  </td>
                  <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                    {reclamo.fechaRespOperaciones == null
                      ? "En proceso"
                      : format(
                          new Date(reclamo.fechaRespOperaciones),
                          "dd/MM/yyyy HH:mm"
                        )}
                    - UserName
                  </td>
                  <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                    {reclamo.fechaRespLegal == null
                      ? "En proceso"
                      : format(
                          new Date(reclamo.fechaRespLegal),
                          "dd/MM/yyyy HH:mm"
                        )}
                    - UserName
                  </td>
                  <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                    {reclamo.fechaRecepcionCliente == null
                      ? "En proceso"
                      : format(
                          new Date(reclamo.fechaRecepcionCliente),
                          "dd/MM/yyyy HH:mm"
                        )}
                    - UserName
                  </td>
                  <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                    {reclamo.fechaRecepcionCliente == null
                      ? "En proceso"
                      : format(
                          new Date(reclamo.fechaRecepcionCliente),
                          "dd/MM/yyyy HH:mm"
                        )}
                    - UserName
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetallesReclamos;
