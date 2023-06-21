import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import useReclamos from "../hooks/useReclamos";
const FilaTablaReclamo = ({ reclamo }) => {
  //   console.log(reclamo);
  const {
    handleSeguridad,
    handleEnviarRespuestaOperaciones,
    loading,
    error,
    respondido,
  } = useReclamos();
  const [observaciones, setObservaciones] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <tr
        key={reclamo.id}
        // className={`${
        //   reclamo.id == "1"
        //     ? "bg-green-500 text-white"
        //     : reclamo.id == "2"
        //     ? "bg-amber-200"
        //     : "bg-red-300"
        // }`}
      >
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {reclamo.codigo}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {format(new Date(reclamo.fechaRecepcion), "dd/MM/yyyy HH:mm:ss")}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {reclamo.fechaEnvio != null
            ? format(new Date(reclamo.fechaEnvio), "dd/MM/yyyy HH:mm:ss")
            : "-----"}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {!reclamo.fechaRespSeguridad ? (
            <button
              onClick={() => handleSeguridad(reclamo.numeroVolante)}
              className="ml-2 focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Responder
            </button>
          ) : (
            format(new Date(reclamo.fechaRespSeguridad), "dd/MM/yyyy HH:mm:ss")
          )}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap flex flex-col items-center justify-center">
          {!reclamo.observaciones ? (
            <button
              onClick={handleOpenModal}
              // onChange={(e) => setObservaciones(e.target.value)}
              type="button"
              className="ml-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Observaciones
            </button>
          ) : reclamo.fechaRespOperaciones != null ? (
            format(
              new Date(reclamo.fechaRespOperaciones),
              "dd/MM/yyyy HH:mm:ss"
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
          Cita
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          Si/No
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          Dias restantes
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          Cierre fecha
        </td>
      </tr>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 ">
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
      )}
    </>
  );
};

export default FilaTablaReclamo;
