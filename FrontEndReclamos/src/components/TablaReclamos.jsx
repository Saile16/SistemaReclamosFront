import { useState } from "react";

import useReclamos from "../hooks/useReclamos";
import Spinner from "./Spinner";
import { format } from "date-fns";
import Modal from "./Modal";
import { calculoHorasReclamo } from "../utils/calculoHorasReclamo";
import { calculoDiasRestantes } from "../utils/calculoDiasRestantes";
const TablaReclamos = () => {
  const {
    handleSeguridad,
    handleEnviarRespuestaOperaciones,
    handleEnviarRespuestaLegal,
    handleFechaEnvio,
    handleCerrarReclamo,
    handleRecepcionCliente,
    loading,
    reclamos,
  } = useReclamos();

  const [observaciones, setObservaciones] = useState("");
  const [showModal, setShowModal] = useState(false);

  // console.log(reclamo);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    if (e.target.value === "cerrar") {
      setShowModal(false);
      setObservaciones("");
      return;
    }
    setShowModal(false);
  };

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
            <tr
              key={reclamo.id}
              className={`${
                reclamo.estado == "S"
                  ? " text-white transition duration-300 ease-in-out hover:bg-amber-200"
                  : reclamo.estado == "A"
                  ? "bg-green-500"
                  : "bg-red-300"
              }`}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                {reclamo.codigo}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {format(new Date(reclamo.fechaRecepcion), "dd/MM/yyyy HH:mm")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {!reclamo.fechaEnvio ? (
                  <button
                    onClick={() => handleFechaEnvio(reclamo.numeroVolante)}
                    className="ml-2 focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Enviar
                  </button>
                ) : (
                  format(new Date(reclamo.fechaEnvio), "dd/MM/yyyy HH:mm")
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {!reclamo.fechaRespSeguridad ? (
                  <button
                    onClick={() => handleSeguridad(reclamo.numeroVolante)}
                    className="ml-2 focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Confirmar
                  </button>
                ) : (
                  format(
                    new Date(reclamo.fechaRespSeguridad),
                    "dd/MM/yyyy HH:mm"
                  )
                )}
              </td>
              <td className="text-gray-800 px-6 py-4 text-sm font-medium text-center whitespace-nowrap flex flex-col items-center justify-center">
                {!reclamo.observaciones ? (
                  <button
                    onClick={handleOpenModal}
                    // onChange={(e) => setObservaciones(e.target.value)}
                    type="button"
                    className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Observaciones
                  </button>
                ) : reclamo.fechaRespOperaciones != null ? (
                  format(
                    new Date(reclamo.fechaRespOperaciones),
                    "dd/MM/yyyy HH:mm"
                  )
                ) : (
                  "No envió respuesta"
                )}
                {observaciones ? (
                  <button
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() =>
                      handleEnviarRespuestaOperaciones(
                        reclamo.numeroVolante,
                        observaciones
                      )
                    }
                  >
                    Enviar
                  </button>
                ) : (
                  ""
                )}
              </td>

              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap flex flex-col items-center justify-center">
                  {!reclamo.fechaRespLegal ? (
                    <button
                      onClick={() =>
                        handleEnviarRespuestaLegal(reclamo.numeroVolante)
                      }
                      // onChange={(e) => setObservaciones(e.target.value)}
                      type="button"
                      className="ml-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Confirmar Entrega
                    </button>
                  ) : reclamo.fechaRespLegal != null ? (
                    format(new Date(reclamo.fechaRespLegal), "dd/MM/yyyy HH:mm")
                  ) : (
                    "No envió respuesta"
                  )}
                </td>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {!reclamo.fechaRecepcionCliente ? (
                  <button
                    onClick={() =>
                      handleRecepcionCliente(reclamo.numeroVolante)
                    }
                    // onChange={(e) => setObservaciones(e.target.value)}
                    type="button"
                    className="ml-2 focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Cliente Recepcionó
                  </button>
                ) : reclamo.fechaRecepcionCliente != null ? (
                  format(
                    new Date(reclamo.fechaRecepcionCliente),
                    "dd/MM/yyyy HH:mm"
                  )
                ) : (
                  "No envió respuesta"
                )}
              </td>

              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {!reclamo.fechaCierre ? (
                  <button
                    onClick={() => handleCerrarReclamo(reclamo.numeroVolante)}
                    className="ml-2 focus:outline-none text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Cerrar Reclamo
                  </button>
                ) : (
                  format(new Date(reclamo.fechaCierre), "dd/MM/yyyy HH:mm")
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {reclamo.fechaCierre
                  ? calculoHorasReclamo(
                      reclamo.fechaRecepcion,
                      reclamo.fechaCierre
                    ) + " horas"
                  : "----"}
              </td>
              {/* <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {reclamo.fechaCierre != null
            ? calculoDiasRestantes(reclamo.fechaCierre)
            : "---"}
        </td> */}
            </tr>
          ))}
          {/* Modal */}
          {showModal ? (
            <Modal>
              <div className="fixed inset-0 flex items-center justify-center z-10">
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                <div className="bg-white rounded-lg p-6 z-20 w-[590px]">
                  <h2 className="text-xl font-bold mb-4">Observaciones</h2>
                  <textarea
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    className="w-full h-32 border border-gray-300 p-2"
                    placeholder="Escribe tus observaciones..."
                  ></textarea>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                      value="cerrar"
                    >
                      Cerrar
                    </button>
                    <button
                      className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                      onClick={handleCloseModal}
                      value="guardar"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          ) : null}
        </tbody>
      </table>
    </>
  );
};

export default TablaReclamos;
