import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { format } from "date-fns";
import ReclamosContext from "../context/ReclamosProvider";
import { calcularHorasLaborales } from "../utils/calcularHorasLaborales";
import FiltrosBusqueda from "../components/FiltrosBusqueda";
import EncabezadoTabla from "../components/EncabezadoTabla";

const DetallesReclamos = () => {
  const {
    reclamos,
    loading,
    listarReclamos,
    fechaInicio,
    fechaFin,
    tipoReclamo,
  } = useContext(ReclamosContext);

  useEffect(() => {
    listarReclamos();
  }, []);

  const horasSeguridad = (fechaRespSeguridad, fechaEnvio) => {
    const horasTotales = Math.floor(
      (new Date(fechaRespSeguridad) - new Date(fechaEnvio)) / (1000 * 60)
    );

    const horas = Math.floor(horasTotales / 60);
    const minutos = Math.floor(horasTotales % 60);
    return `${horas} horas y ${minutos} minutos`;
  };

  if (loading) return <Spinner />;
  return (
    <div className="overflow-x-auto">
      <FiltrosBusqueda mostrarFechas mostrarTipoReclamo mostrarEstado={false} />
      <div className="p-1.5 w-auto inline-block align-middle">
        <div className="overflow-hidden border rounded-lg">
          <table className="table-fixed">
            <thead className="bg-gray-50">
              <tr className="">
                <EncabezadoTabla titulo="Código Reclamo" />
                <EncabezadoTabla titulo="F. Recepción" />
                <EncabezadoTabla titulo="Envío" />
                <EncabezadoTabla titulo="Respuesta Seguridad" />
                <EncabezadoTabla titulo="Operaciones" />
                <EncabezadoTabla titulo="Legal" />
                <EncabezadoTabla titulo="Recepción Cliente" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reclamos
                .filter((val) => {
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
                  <tr key={reclamo.id}>
                    <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                      {reclamo.tipoReclamo} - {reclamo.codigo}
                    </td>
                    <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                      {format(
                        new Date(reclamo.fechaRecepcion),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </td>
                    <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                      {reclamo.fechaEnvio == null
                        ? "En proceso"
                        : `${format(
                            new Date(reclamo.fechaEnvio),
                            "dd/MM/yyyy HH:mm"
                          )} - username -
                          ${calcularHorasLaborales(
                            reclamo.fechaRecepcion,
                            reclamo.fechaEnvio
                          )}`}
                    </td>
                    <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                      {reclamo.fechaRespSeguridad == null
                        ? "En proceso"
                        : `${format(
                            new Date(reclamo.fechaRespSeguridad),
                            "dd/MM/yyyy HH:mm"
                          )}- UserName -
                          ${horasSeguridad(
                            reclamo.fechaRespSeguridad,
                            reclamo.fechaEnvio
                          )}
                          `}
                    </td>
                    <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                      {reclamo.fechaRespOperaciones == null
                        ? "En proceso"
                        : `${format(
                            new Date(reclamo.fechaRespOperaciones),
                            "dd/MM/yyyy HH:mm"
                          )}
                          - UserName -
                      ${calcularHorasLaborales(
                        reclamo.fechaRespSeguridad,
                        reclamo.fechaRespOperaciones
                      )}
                          `}
                    </td>
                    <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                      {reclamo.fechaRespLegal == null
                        ? "En proceso"
                        : `${format(
                            new Date(reclamo.fechaRespLegal),
                            "dd/MM/yyyy HH:mm"
                          )}- UserName -
                          ${calcularHorasLaborales(
                            reclamo.fechaRespOperaciones,
                            reclamo.fechaRespLegal
                          )} `}
                    </td>
                    <td className=" p-6 text-sm font-medium text-gray-800 whitespace-nowrap  ">
                      {reclamo.fechaRecepcionCliente == null
                        ? "En proceso"
                        : `${format(
                            new Date(reclamo.fechaRecepcionCliente),
                            "dd/MM/yyyy HH:mm"
                          )}  - UserName -
                          ${calcularHorasLaborales(
                            reclamo.fechaRespLegal,
                            reclamo.fechaRecepcionCliente
                          )}`}
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
