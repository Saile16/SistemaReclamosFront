import { useContext, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import ReclamosContext from "../context/ReclamosProvider";
registerLocale("es", es);

const FilaExpandible = ({ reclamo }) => {
  const [fechaCitaCliente2, setFechaCitaCliente2] = useState(null);
  const [asistio, setAsistio] = useState(reclamo.asistio);

  const { handleConfirmacion } = useContext(ReclamosContext);

  return (
    <>
      <tr className="ml-5 bg-gray-200 ">
        <th className=" px-5  py-5  text-[13px] font-bold text-center text-gray-500 uppercase">
          Número Volante o Guía
        </th>
        <th className=" px-5  py-5  text-[13px] font-bold text-center text-gray-500 uppercase">
          Observaciones
        </th>
        <th className=" px-5  py-5 text-[13px] font-bold text-center text-gray-500 uppercase">
          Nombre Cliente
        </th>
        <th className=" px-5  py-5 text-[13px] font-bold text-center text-gray-500 uppercase">
          Fecha Visita 1
        </th>
        <th className=" px-5  py-5 text-[13px] font-bold text-center text-gray-500 uppercase">
          Asistió?
        </th>
        <th className=" px-5  py-5 text-[13px] font-bold text-center text-gray-500 uppercase">
          Fecha Visita 2
        </th>
      </tr>
      <tr className="">
        <td className="py-5 px-10">
          {reclamo.numeroVolante ? reclamo.numeroVolante : reclamo.guiaMaster}
        </td>
        <td className="py-5 px-10">{reclamo.observaciones}</td>
        <td className="py-5 px-10">{reclamo.cliente}</td>

        <td className="py-5 px-6">
          {reclamo.fechaCitaCliente1
            ? format(new Date(reclamo.fechaCitaCliente1), "dd/MM/yyyy HH:mm")
            : "----"}
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
                handleConfirmacion(
                  reclamo.numeroVolante,
                  fechaCitaCliente2,
                  asistio
                )
              }
            >
              {asistio ? "Confirmar" : "Reprogramar Cita"}
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default FilaExpandible;
