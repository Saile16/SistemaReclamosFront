import { useState } from "react";
import { Link } from "react-router-dom";

import { calculoHorasReclamo } from "../utils/calculoHorasReclamo";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useEffect } from "react";
import Tabla from "../components/Tabla";
import Mensajes from "../components/Mensajes";
const ReclamosPage = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estadoReclamo, setEstadoReclamo] = useState("");
  const [reclamosFiltrados, setReclamosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reclamos, setReclamos] = useState([]);
  const [error, setError] = useState({
    error: false,
    mensaje: "",
  });

  const listarReclamos = async (fechaInicio = "", fechaFin = "") => {
    // console.log(fechaFin);
    setLoading(true);
    if (fechaInicio === "" && fechaFin == "") {
      // console.log("entra");
      try {
        const response = await axios.get("http://localhost:8080/api/listar");
        setReclamos(response.data);
        setError({ error: false, mensaje: "" });
        console.log(response.data);
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

  useEffect(() => {
    listarReclamos();
  }, []);

  const handleFiltarPorFecha = async (fechaInicio, fechaFin) => {
    console.log("llamo");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/buscar", {
        fechaInicio,
        fechaFin,
      });
      console.log("desde handleFiltrarFecha");
      setReclamos(response.data);
      setLoading(false);
      setError({ error: false, mensaje: "" });
    } catch (error) {
      console.log(error, "ajkldsakj");
      setError({
        error: true,
        mensaje: "No se encontraron datos en esas fechas",
      });
      setLoading(false);
    }
    // listarReclamos();
  };
  // console.log(reclamo);

  const handleBuscarPorEstado = async (estado) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/estado", {
        estado,
      });
      console.log(response.data, "desde estadooooo");
      setReclamos(response.data);
      setLoading(false);
      setError({ error: false, mensaje: "" });
    } catch (error) {
      console.log(error, "ajkldsakj");
      setError({
        error: true,
        mensaje: "No se encontraron reclamos con ese estado",
      });
      setLoading(false);
    }
  };
  if (loading) return <Spinner />;

  return (
    <div className="w-auto">
      <div className=" flex items-center justify-evenly mb-12 ">
        <Link
          className=" focus:outline-none text-white bg-emerald-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2"
          to="/ingreso-reclamo"
        >
          Ingresar reclamo
        </Link>
        <div className="w-1/2 flex items-center justify-evenly flex-col">
          <div className="flex items-center justify-evenly mt-2 text-left">
            <span className="w-1/2 text-gray-600 text-2xl mr-10">
              SEGUIMIENTO
            </span>
            <span className="w-1/2 h-7 inline-block bg-amber-200 ml-4"></span>
          </div>
          <div className="flex items-center justify-center mt-2">
            <span className="text-gray-600 text-2xl">CERRADO POR LEGAL</span>
            <span className="w-12 h-7 inline-block bg-emerald-200  ml-4"></span>
          </div>
          <div className="flex items-center justify-center mt-2">
            <span className="shrink text-gray-600 text-2xl">
              CONCLUIDO - CERRADO
            </span>
            <span className="shrink w-12 h-7 inline-block bg-red-300  ml-4"></span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <div className="flex items-center justify-start mb-6 ">
          <div className="ml-4">
            <label className="text-left mb-2 text-gray-500 font-bold text-lg">
              Fecha Inicio
            </label>
            <input
              type="date"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <label className="text-left mb-2 text-gray-500 font-bold text-lg">
              Fecha Fin
            </label>
            <input
              type="date"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
          <div className="ml-4 flex items-center justify-center ">
            <button
              type="button"
              className="mt-7 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => handleFiltarPorFecha(fechaInicio, fechaFin)}
            >
              Buscar
            </button>
            {/* <button
              className="mt-7  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => listarReclamos()}
            >
              Listar todos
            </button> */}
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div className="mr-6">
            <label className="text-left mb-2 text-gray-500 font-bold text-lg block">
              Filtrar por estado
            </label>
            <select
              name="personaReclamo"
              required
              className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400 "
              onChange={(e) => setEstadoReclamo(e.target.value)}
              value={estadoReclamo}
            >
              <option value="----------" defaultValue>
                --------
              </option>
              <option value="S">Seguimiento</option>
              <option value="A">Atendido</option>
              <option value="C">Cerrado</option>
            </select>
          </div>
          <button
            type="button"
            className="mt-7 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => handleBuscarPorEstado(estadoReclamo)}
          >
            Buscar
          </button>
        </div>
      </div>

      {error.error && <Mensajes>{error.mensaje}</Mensajes>}
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="w-full">
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
                    Tiempo Transcurrido
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
                  >
                    Procede
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reclamos.map((reclamo) => (
                  <Tabla
                    reclamo={reclamo}
                    key={reclamo.id}
                    listarReclamos={listarReclamos}
                    setError={setError}
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReclamosPage;
