import { format } from "date-fns";
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from "react-icons/bs";
import { calculoHorasReclamo } from "../utils/calculoHorasReclamo";
import axios from "axios";
import { useState } from "react";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { diasTranscurridos } from "../utils/diasTranscurridos";
import { calculoDiasRestantes } from "../utils/calculoDiasRestantes";
registerLocale("es", es);
const Tabla = ({ reclamo, listarReclamos, fechaInicio, fechaFin }) => {
  const [observaciones, setObservaciones] = useState("");
  const [fechaCitaCliente1, setFechaCitaCliente1] = useState();
  const [fechaCitaCliente2, setFechaCitaCliente2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [asistio, setAsistio] = useState(reclamo.asistio);
  const [expandedRows, setExpandedRows] = useState([]);
  const [cliente, setCliente] = useState("");
  const [procede, setProcede] = useState();
  const [datosCorreo, setDatosCorreo] = useState({
    smtp: "smtp.gmail.com",
    cuentaEnvio: "atencionalcliente@shohin.com.pe",
    clave: "Q?hBk-e5Q2$LG$qk",
    destinatarios: "desarrollo@shohin.com.pe",
    asunto: "TEST DE ENVIO DE CORREO",
    contenido: "",
    usuario: "jmendez",
    gmail: "true",
  });
  const handleToggleRow = async (id) => {
    try {
    } catch (error) {}
    if (expandedRows.includes(id)) {
      setExpandedRows((prevExpandedRows) =>
        prevExpandedRows.filter((rowId) => rowId !== id)
      );
    } else {
      setExpandedRows((prevExpandedRows) => [...prevExpandedRows, id]);
    }
  };

  const handleFechaEnvio = async (reclamo) => {
    console.log(reclamo);
    const { almacen, guiaMaster, guiaHija, numeroVolante } = reclamo;
    try {
      const respuestaDatos = await axios.post(
        "http://localhost:8081/volantes/posiciones",
        { almacen, guiaMaster, guiaHija }
      );
      const tarjaUbicacion = respuestaDatos.data; //reazlizar un map para las ubicaciones y fecha tarja
      console.log(tarjaUbicacion);
      const respuestaFechas = await axios.post(
        "http://localhost:8081/volantes/fechas",
        {
          almacen,
          numeroVolante,
        }
      );
      const {
        fechaInicioAforo,
        fechaInicioPrevio,
        fechaTerminoAforo,
        fechaTerminoPrevio,
      } = respuestaFechas.data[0];
      console.log(respuestaFechas.data, "asdjlaksdjk");
      console.log(new Date());

      const respuestaRetiros = await axios.post(
        "http://localhost:8081/volantes/retiro",
        { almacen, numeroVolante }
      );
      const { numeroSalida, fechaRetira } = respuestaRetiros.data[0];

      const fechaEnvio = new Date();
      const datosCorreo = {
        smtp: "smtp.gmail.com",
        cuentaEnvio: "atencionalcliente@shohin.com.pe",
        clave: "Q?hBk-e5Q2$LG$qk",
        destinatarios: "desarrollo@shohin.com.pe",
        asunto: "TEST DE ENVIO DE CORREO",
        contenido: `Solicitante: Dora del Carpio ---- Fecha: ${fechaEnvio.toLocaleDateString()} Hora: ${fechaEnvio.toLocaleTimeString()} \n
          Motivo Reclamo: ${reclamo.motivoReclamo} ---- Tipo de Carga: ${
          reclamo.tipoCarga == "G" ? "General" : "Faltan los otros tipos poner"
        } \n
        Awb: ${guiaMaster} ---- Cantidad de bultos: ${reclamo.bultoRecibido} \n
        Hawb: ${guiaHija} ---- Bultos en mal estado: ${
          reclamo.bultoMalEstado
        } \n
        Hoja de Tarja - Ubicación: ${tarjaUbicacion.map((t) =>
          t.fechaTarja != null
            ? `${format(new Date(t.fechaTarja), "dd/MM/yyyy HH:mm")} - ${
                t.posiciones
              } `
            : "No hay dato"
        )} \n

        Tipo: ${
          reclamo.tipoIngreso == "V"
            ? "Carga de Importación"
            : "Direccionamiento"
        } \n

        Vuelo: ${reclamo.numeroVuelo} ---- Fecha: ${format(
          new Date(reclamo.fechaVuelo),
          "dd/MM/yyyy"
        )} \n

        Fecha y Hora de Salida de carga: ${format(
          new Date(fechaRetira),
          "dd/MM/yyyy"
        )} \n
        Numero de Volante de salida: ${numeroSalida} \n
        Inspecciones:            Inicio                         Término\n
        Aforos:             ${
          fechaInicioAforo == null || fechaTerminoAforo == null
            ? "No cuenta con retiro"
            : format(new Date(fechaInicioAforo), "dd/MM/yyyy") -
              format(new Date(fechaTerminoAforo), "dd/MM/yyyy")
        } 
        Reconocimiento Previo: ${
          fechaInicioPrevio == null || fechaTerminoPrevio == null
            ? "No cuenta con retiro"
            : format(new Date(fechaInicioPrevio), "dd/MM/yyyy") -
              format(new Date(fechaTerminoPrevio), "dd/MM/yyyy")
        } 
        `,
        usuario: "jmendez",
        gmail: "true",
      };
      // const respuestaCorreo = await axios.post(
      //   "http://192.168.10.23:8081/mail/grabar_correo",
      //   datosCorreo
      // );
      // console.logr(respuestaCorreo);
      try {
        console.log(datosCorreo);
      } catch {}
    } catch (error) {
      console.log("Error", error);
    }

    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaEnvio: new Date(),
      });
      // console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos(fechaInicio, fechaFin);
  };

  const handleSeguridad = async (numeroVolante) => {
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRespSeguridad: new Date(),
      });
      // console.log(response);
      // listarReclamos();
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos(fechaInicio, fechaFin);
  };

  const handleEnviarRespuestaOperaciones = async (
    numeroVolante,
    observaciones,
    cliente,
    fechaCitaCliente1
  ) => {
    console.log(fechaCitaCliente1);
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRespOperaciones: new Date(),
        observaciones,
        cliente,
        fechaCitaCliente1,
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos(fechaInicio, fechaFin);
  };
  const handleEnviarRespuestaLegal = async (numeroVolante) => {
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRespLegal: new Date(),
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos(fechaInicio, fechaFin);
  };
  const handleRecepcionCliente = async (numeroVolante) => {
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRecepcionCliente: new Date(),
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos(fechaInicio, fechaFin);
  };
  const handleCerrarReclamo = async (numeroVolante) => {
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaCierre: new Date(),
        procede,
      });
      // console.log(response);
      // listarReclamos();
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos(fechaInicio, fechaFin);
  };
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

  const handleConfirmacion = async (numeroVolante, fechaCitaCliente2) => {
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        asistio,
        fechaCitaCliente2,
      });
      // console.log(response);
      // listarReclamos();
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos(fechaInicio, fechaFin);
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
        <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap flex items-center justify-center text-center ">
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
          {reclamo.codigo}
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
            <button
              onClick={() => handleSeguridad(reclamo.numeroVolante)}
              className="ml-2 focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Confirmar
            </button>
          ) : (
            <p>
              {format(new Date(reclamo.fechaRespSeguridad), "dd/MM/yyyy HH:mm")}
            </p>
          )}
        </td>
        <td className="text-gray-800 px-6 py-4 text-sm font-medium text-center whitespace-nowrap ">
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
            <button
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() =>
                handleEnviarRespuestaOperaciones(
                  reclamo.numeroVolante,
                  observaciones,
                  cliente,
                  fechaCitaCliente1
                )
              }
            >
              Enviar
            </button>
          ) : (
            ""
          )}
        </td>

        <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap text-gray-800">
          {!reclamo.fechaRespLegal ? (
            <button
              onClick={() => handleEnviarRespuestaLegal(reclamo.numeroVolante)}
              // onChange={(e) => setObservaciones(e.target.value)}
              type="button"
              className="ml-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Confirmar Entrega
            </button>
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
            <button
              onClick={() => handleRecepcionCliente(reclamo.numeroVolante)}
              // onChange={(e) => setObservaciones(e.target.value)}
              type="button"
              className="ml-2 focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Cliente Recepcionó
            </button>
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
          {!reclamo.fechaCierre ? (
            <button
              onClick={() => handleCerrarReclamo(reclamo.numeroVolante)}
              className="ml-2 focus:outline-none text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Cerrar Reclamo
            </button>
          ) : (
            <p>{format(new Date(reclamo.fechaCierre), "dd/MM/yyyy HH:mm")}</p>
          )}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {reclamo.fechaCierre
            ? diasTranscurridos(reclamo.fechaEnvio, reclamo.fechaCierre) +
              " días "
            : "----"}
        </td>
        <td
          className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap bg-white ${
            reclamo.procede == null
              ? "bg-white"
              : reclamo.procede == "si"
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
        {/* <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
{reclamo.fechaCierre != null
? calculoDiasRestantes(reclamo.fechaCierre)
: "---"}
</td> */}
      </tr>
      {expandedRows.includes(reclamo.id) && (
        <>
          <tr className="ml-5 bg-gray-200 ">
            <th className=" px-7 py-5  text-[13px] font-bold text-center text-gray-500 uppercase">
              Número Volante o Guía
            </th>
            <th className=" px-7 py-5  text-[13px] font-bold text-center text-gray-500 uppercase">
              Observaciones
            </th>
            <th className=" px-7 py-5 text-[13px] font-bold text-center text-gray-500 uppercase">
              Nombre Cliente
            </th>
            <th className=" px-7 py-5 text-[13px] font-bold text-center text-gray-500 uppercase">
              Fecha Visita 1
            </th>
            <th className=" px-7 py-5 text-[13px] font-bold text-center text-gray-500 uppercase">
              Asistió?
            </th>
            <th className=" px-7 py-5 text-[13px] font-bold text-center text-gray-500 uppercase">
              Fecha Visita 2
            </th>
          </tr>
          <tr className="">
            <td className="py-5 px-10">{reclamo.numeroVolante}</td>
            <td className="py-5 px-10">{reclamo.observaciones}</td>
            <td className="py-5 px-10">{reclamo.cliente}</td>

            <td className="py-5 px-10">
              {format(new Date(reclamo.fechaCitaCliente1), "dd/MM/yyyy HH:mm")}
            </td>
            <td className="py-3 text-[13px]">
              <input
                type="checkbox"
                checked={asistio}
                onChange={(e) => setAsistio(!asistio)}
                className="w-6 h-6"
                disabled={
                  reclamo.fechaCitaCliente2 || reclamo.asistio ? true : false
                }
              />
            </td>
            <td>
              {asistio ? (
                "-----------"
              ) : (
                <DatePicker
                  name="fechaCitaCliente2"
                  selected={
                    reclamo.fechaCitaCliente2
                      ? new Date(reclamo.fechaCitaCliente2)
                      : fechaCitaCliente2
                  }
                  onChange={(date) => {
                    setFechaCitaCliente2(date);
                    console.log(typeof fechaCitaCliente2);
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="Seleccione fecha y hora"
                  locale="es"
                  timeCaption="Hora"
                  className={`${
                    reclamo.fechaCitaCliente2 ? "bg-gray-200" : "bg-white"
                  } w-full  border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={reclamo.fechaCitaCliente2 ? true : false}
                />
              )}
            </td>
            <td className="py-3">
              {reclamo.asistio || reclamo.fechaCitaCliente2 ? (
                ""
              ) : (
                <button
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
                  onClick={() =>
                    handleConfirmacion(reclamo.numeroVolante, fechaCitaCliente2)
                  }
                >
                  {asistio ? "Confirmar" : "Reprogramar Cita"}
                </button>
              )}
            </td>
          </tr>
        </>
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
