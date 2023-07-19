import { format } from "date-fns";
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from "react-icons/bs";
import { useContext, useState } from "react";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { diasTranscurridos } from "../utils/diasTranscurridos";
import ReclamosContext from "../context/ReclamosProvider";
import FilaExpandible from "./filaExpandible";
import Button from "./Button";
registerLocale("es", es);

const Tabla = ({ reclamo }) => {
  const [observaciones, setObservaciones] = useState("");
  const [fechaCitaCliente1, setFechaCitaCliente1] = useState();
  const [showModal, setShowModal] = useState(false);
  const [cliente, setCliente] = useState("");
  const [procede, setProcede] = useState();
  const {
    handleFechaEnvio,
    handleSeguridad,
    handleEnviarRespuestaOperaciones,
    handleEnviarRespuestaLegal,
    handleRecepcionCliente,
    handleCerrarReclamo,
    loading,

    handleToggleRow,

    expandedRows,
  } = useContext(ReclamosContext);

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
        className={` ${
          reclamo.estado == "S"
            ? " text-white transition duration-300 ease-in-out bg-amber-200"
            : reclamo.estado == "A"
            ? "bg-emerald-200"
            : "bg-red-200"
        }  text-center`}
      >
        <td className=" px-4 py-6 text-sm font-medium text-gray-800 whitespace-nowrap flex items-center justify-center text-center ">
          {expandedRows.includes(reclamo.id) ? (
            <BsArrowUpSquareFill
              className=" rounded-full text-4xl text-black mr-3 cursor-pointer"
              onClick={() => handleToggleRow(reclamo.id)}
            />
          ) : (
            <BsArrowDownSquareFill
              className=" rounded-full text-4xl text-black mr-3 cursor-pointer"
              onClick={() => handleToggleRow(reclamo.id)}
            />
          )}
          {reclamo.tipoReclamo} - {reclamo.codigo}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
          {format(new Date(reclamo.fechaRecepcion), "dd/MM/yyyy HH:mm")}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {loading && <Spinner />}
          {!reclamo.fechaEnvio ? (
            <button
              onClick={() => handleFechaEnvio(reclamo)}
              className="ml-2 focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Enviar
            </button>
          ) : (
            <p>{format(new Date(reclamo.fechaEnvio), "dd/MM/yyyy HH:mm")}</p>
          )}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {!reclamo.fechaRespSeguridad ? (
            <Button
              onClick={() => handleSeguridad(reclamo.numeroVolante)}
              className={`ml-2 focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
            >
              Confirmar
            </Button>
          ) : (
            <p>
              {format(new Date(reclamo.fechaRespSeguridad), "dd/MM/yyyy HH:mm")}
            </p>
          )}
        </td>
        <td className="text-gray-800 px-6 py-4 text-sm font-medium text-center whitespace-nowrap ">
          {!reclamo.observaciones ? (
            <Button
              onClick={handleOpenModal}
              className={`mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
            >
              Observaciones
            </Button>
          ) : reclamo.fechaRespOperaciones != null ? (
            <p>
              {format(
                new Date(reclamo.fechaRespOperaciones),
                "dd/MM/yyyy HH:mm"
              )}
            </p>
          ) : (
            "No envió respuesta"
          )}
          {observaciones ? (
            <Button
              onClick={() => {
                handleEnviarRespuestaOperaciones(
                  reclamo.numeroVolante,
                  observaciones,
                  cliente,
                  fechaCitaCliente1
                );
                setObservaciones("");
              }}
              className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
            >
              Enviar
            </Button>
          ) : (
            ""
          )}
        </td>

        <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap text-gray-800">
          {!reclamo.fechaRespLegal ? (
            <Button
              onClick={() => handleEnviarRespuestaLegal(reclamo.numeroVolante)}
              className={`ml-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
            >
              Confirmar Entrega
            </Button>
          ) : reclamo.fechaRespLegal != null ? (
            <p>
              {format(new Date(reclamo.fechaRespLegal), "dd/MM/yyyy HH:mm")}
            </p>
          ) : (
            "No envió respuesta"
          )}
        </td>

        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {!reclamo.fechaRecepcionCliente ? (
            <Button
              onClick={() => handleRecepcionCliente(reclamo.numeroVolante)}
              className={`ml-2 focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
            >
              Cliente Recepcionó
            </Button>
          ) : reclamo.fechaRecepcionCliente != null ? (
            <p>
              {format(
                new Date(reclamo.fechaRecepcionCliente),
                "dd/MM/yyyy HH:mm"
              )}
            </p>
          ) : (
            "No envió respuesta"
          )}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {reclamo.fechaRecepcionCliente
            ? diasTranscurridos(
                reclamo.fechaEnvio,
                reclamo.fechaRecepcionCliente
              ) + " días "
            : "----"}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {!reclamo.fechaCierre ? (
            <Button
              onClick={() =>
                handleCerrarReclamo(reclamo.numeroVolante, procede)
              }
              className={`ml-2 focus:outline-none text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
            >
              Cerrar Reclamo
            </Button>
          ) : (
            <p>{format(new Date(reclamo.fechaCierre), "dd/MM/yyyy HH:mm")}</p>
          )}
        </td>
        <td
          className={`px-6 py-4 text-sm text-gray-800 whitespace-nowra ${
            reclamo.procede == null
              ? "bg-white"
              : reclamo.procede === "si"
              ? "bg-sky-200"
              : "bg-red-200"
          }`}
        >
          <select
            className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap rounded"
            value={reclamo.procede}
            onChange={(e) => {
              console.log(e.target.value);
              setProcede(e.target.value);
            }}
            disabled={reclamo.procede ? true : false}
          >
            <option>------</option>
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
        </td>
      </tr>
      {expandedRows.includes(reclamo.id) && (
        <FilaExpandible reclamo={reclamo} />
      )}
      {/* Modal */}
      {showModal ? (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            <div className="bg-white rounded-lg p-6 z-20 w-[590px] h-auto">
              <h2 className="text-xl font-bold mb-4">Observaciones</h2>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="w-full h-32 border border-gray-300 p-2"
                placeholder="Escribe tus observaciones..."
              ></textarea>
              <div className="flex  items-center justify-between">
                <div className="w-1/2">
                  <label className="mt-5  mb-3 text-[18px] font-bold text-center text-black ">
                    Cita cliente
                  </label>
                  <DatePicker
                    name="fechaRecepcion"
                    selected={fechaCitaCliente1}
                    onChange={(date) => {
                      console.log(date);
                      setFechaCitaCliente1(date);
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                    placeholderText="Seleccione fecha y hora"
                    locale="es"
                    timeCaption="Hora"
                    className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2 p-2 ">
                  <label className="text-[18px] font-bold text-center text-black ">
                    Cliente
                  </label>
                  <input
                    type="text"
                    placeholder="Persona que asistirá"
                    className=" px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 w-full"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                  />
                </div>
              </div>
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
    </>
  );
};

export default Tabla;
