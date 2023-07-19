import { useContext } from "react";
import ReclamosContext from "../context/ReclamosProvider";

const FiltrosBusqueda = ({
  mostrarFechas,
  mostrarEstado,
  mostrarTipoReclamo,
}) => {
  const {
    fechaInicio,
    fechaFin,
    estadoReclamo,
    tipoReclamo,
    setFechaInicio,
    setFechaFin,
    setEstadoReclamo,
    setTipoReclamo,
  } = useContext(ReclamosContext);

  return (
    <div className="flex items-center justify-around mb-5">
      {mostrarFechas && (
        <div className="w-full flex items-center justify-center  ">
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
        </div>
      )}

      <div className="w-full flex items-center justify-center ">
        {mostrarEstado && (
          <div className="mr-6 w-1/3">
            <label className="text-left mb-2 text-gray-500 font-bold text-lg block">
              Filtrar por estado
            </label>
            <select
              name="estado"
              required
              className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400 "
              onChange={(e) => setEstadoReclamo(e.target.value)}
              value={estadoReclamo}
            >
              <option value="">---</option>
              <option value="S">Seguimiento</option>
              <option value="A">Atendido</option>
              <option value="C">Cerrado</option>
            </select>
          </div>
        )}

        {mostrarTipoReclamo && (
          <div className="mr-6 w-1/3">
            <label className="text-left mb-2 text-gray-500 font-bold text-lg block">
              Filtrar por Tipo de Reclamo
            </label>
            <select
              name="personaReclamo"
              required
              className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400 "
              onChange={(e) => setTipoReclamo(e.target.value)}
              value={tipoReclamo}
            >
              <option value="">----</option>
              <option value="TRA">Trazabilidad</option>
              <option value="REC">REC</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltrosBusqueda;
