import React, { useState, useEffect } from "react";
import TablaReclamos from "../components/tablaReclamos";
import { Link } from "react-router-dom";
import useReclamos from "../hooks/useReclamos";

function ListarReclamos() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const { listarReclamos, handleFiltarPorFecha } = useReclamos();

  useEffect(() => {
    listarReclamos();
  }, []);

  return (
    <div className="w-auto">
      <div className="flex items-center justify-evenly mb-12">
        <Link
          className=" focus:outline-none text-white bg-emerald-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2"
          to="/ingreso-reclamo"
        >
          Ingresar reclamo
        </Link>
        <div className="flex items-center justify-evenly flex-col">
          <div className="flex items-center justify-center mt-2">
            <span className="text-gray-600 text-2xl">SEGUIMIENTO</span>
            <span className=" w-12 h-7 inline-block bg-yellow-500 ml-4"></span>
          </div>
          <div className="flex items-center justify-center mt-2">
            <span className="shrink text-gray-600 text-2xl">CERRADO</span>
            <span className="shrink w-12 h-7 inline-block bg-red-500  ml-4"></span>
          </div>
          <div className="flex items-center justify-center mt-2">
            <span className="text-gray-600 text-2xl">ATENDIDO</span>
            <span className="w-12 h-7 inline-block bg-green-500  ml-4"></span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start mb-6">
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
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <TablaReclamos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListarReclamos;
