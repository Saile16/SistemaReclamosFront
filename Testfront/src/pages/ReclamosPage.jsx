import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import Tabla from "../components/Tabla";
import Mensajes from "../components/Mensajes";
import ReclamosContext from "../context/ReclamosProvider";
import FiltrosBusqueda from "../components/FiltrosBusqueda";
import EncabezadoTabla from "../components/EncabezadoTabla";
const ReclamosPage = () => {
  const {
    reclamos,
    loading,
    error,
    listarReclamos,
    fechaInicio,
    fechaFin,
    estadoReclamo,
    tipoReclamo,
  } = useContext(ReclamosContext);

  useEffect(() => {
    listarReclamos();
  }, []);

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
          <div className="w-80 flex items-center justify-evenly mt-2">
            <span className="text-left w-4/5 text-gray-600 text-2xl">
              SEGUIMIENTO
            </span>
            <span className="w-1/5 h-7 inline-block bg-amber-200 ml-4"></span>
          </div>
          <div className="w-80 flex items-center justify-center mt-2 ">
            <span className="text-left w-4/5 text-gray-600 text-2xl">
              CERRADO POR LEGAL
            </span>
            <span className="w-1/5 h-7 inline-block bg-emerald-200 ml-4"></span>
          </div>
          <div className="w-80 flex items-center justify-center mt-2">
            <span className="text-left w-4/5 text-gray-600 text-2xl">
              CONCLUIDO - CERRADO
            </span>
            <span className="w-1/5 h-7 inline-block bg-red-300 ml-4"></span>
          </div>
        </div>
        <Link
          to="/detalles"
          className="focus:outline-none text-white bg-black hover:bg-red-800 focus:ring-4 focus:ring-black font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2"
        >
          Detalles
        </Link>
      </div>
      <FiltrosBusqueda mostrarFechas mostrarEstado mostrarTipoReclamo />
      {error.error && <Mensajes>{error.mensaje}</Mensajes>}
      {loading && <Spinner />}
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <EncabezadoTabla titulo="Código Reclamo" />
                  <EncabezadoTabla titulo="F. Recepción" />
                  <EncabezadoTabla titulo="F. Envio" />
                  <EncabezadoTabla titulo="F. Respuesta Seguridad" />
                  <EncabezadoTabla titulo="F. Respuesta Operaciones" />
                  <EncabezadoTabla titulo="F. Respuesta Legal" />
                  <EncabezadoTabla titulo="F. Recepción Cliente" />
                  <EncabezadoTabla titulo="Tiempo Transcurrido" />
                  <EncabezadoTabla titulo="Fecha de Cierre" />
                  <EncabezadoTabla titulo=" Procede" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reclamos
                  .filter((val) => {
                    if (estadoReclamo !== "" && val.estado !== estadoReclamo) {
                      return false;
                    }
                    if (tipoReclamo !== "" && val.tipoReclamo !== tipoReclamo) {
                      return false;
                    }
                    if (fechaInicio && fechaFin) {
                      const fechaInicioSeleccionada = Date.parse(fechaInicio);
                      const fechaFinSeleccionada = Date.parse(fechaFin);
                      const reclamoFecha = Date.parse(val.fechaRecepcion);

                      if (
                        reclamoFecha < fechaInicioSeleccionada ||
                        reclamoFecha > fechaFinSeleccionada
                      ) {
                        return false;
                      }
                    } else if (fechaInicio) {
                      const fechaInicioSeleccionada = Date.parse(fechaInicio);
                      const reclamoFecha = Date.parse(val.fechaRecepcion);

                      if (reclamoFecha < fechaInicioSeleccionada) {
                        return false;
                      }
                    } else if (fechaFin) {
                      const fechaFinSeleccionada = Date.parse(fechaFin);
                      const reclamoFecha = Date.parse(val.fechaRecepcion);

                      if (reclamoFecha > fechaFinSeleccionada) {
                        return false;
                      }
                    }
                    return true;
                  })
                  .map((reclamo) => (
                    <Tabla reclamo={reclamo} key={reclamo.id} />
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
