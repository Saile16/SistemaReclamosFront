import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../components/Spinner";
import Mensajes from "../components/Mensajes";
import ReclamosContext from "../context/ReclamosProvider";
import es from "date-fns/locale/es";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInputs";
registerLocale("es", es);

const IngresoReclamo = () => {
  const {
    loading,
    setFormData,
    formData,
    handleInputChange,
    handleFormKeyDownVolante,
    handleFormKeyDownGuia,
    handleFormSubmit,
    error,
  } = useContext(ReclamosContext);

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fechaRecepcion: date,
    }));
  };

  return (
    <div className="max-w-full mx-auto p-4 h-full">
      <div className="flex justify-center h-full">
        <div className="max-w-[750px] w-full ">
          <h1 className="text-2xl text-center font-bold mb-4">
            Registro reclamo
          </h1>
          <form
            className="grid grid-cols-2 gap-4 p-5"
            onSubmit={handleFormSubmit}
          >
            <div className="col-span-2 flex items-center justify-between">
              <SelectInput
                name="almacen"
                label="Almacen"
                value={formData.almacen}
                onChange={handleInputChange}
                options={[
                  { value: "dt", label: "DT" },
                  { value: "dteer", label: "DTEER" },
                ]}
              />
              <TextInput
                name="numeroVolante"
                label="Volante"
                value={formData.numeroVolante}
                onChange={handleInputChange}
                onKeyDown={handleFormKeyDownVolante}
                placeholder="Número de volante o guía"
              />
              <TextInput
                name="guiaMaster"
                label="Guía"
                value={formData.guiaMaster}
                onChange={handleInputChange}
                onKeyDown={handleFormKeyDownGuia}
                placeholder="Número de guía"
              />
            </div>
            <SelectInput
              name="tipoReclamo"
              label="Tipo de Reclamo"
              value={formData.tipoReclamo}
              onChange={handleInputChange}
              options={[
                { value: "", label: "--------" },
                { value: "TRA", label: "Trazabilidad" },
                { value: "REC", label: "REC" },
              ]}
            />
            <SelectInput
              name="personaReclamo"
              label="Persona Reclamo"
              value={formData.personaReclamo}
              onChange={handleInputChange}
              options={[
                { value: "----------", label: "--------" },
                { value: "Agente Aduana", label: "Agente de Aduanas" },
                { value: "Agente Carga", label: "Agente de Carga" },
                { value: "Deposito Temporal", label: "Deposito Temporal" },
                { value: "ESER", label: "ESER" },
                { value: "Importador", label: "Importador" },
                { value: "Linea Aerea", label: "Linea Aerea" },
              ]}
            />

            <div className=" flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Fecha de Recepción
              </label>
              <DatePicker
                name="fechaRecepcion"
                selected={formData.fechaRecepcion}
                onChange={handleDateChange}
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
            <TextInput
              name="montoReclamo"
              label="Monto De Reclamo"
              value={formData.montoReclamo}
              onChange={handleInputChange}
              placeholder="Monto"
              type="number"
            />

            <TextInput
              name="motivoReclamo"
              label="Motivo De Reclamo"
              span2
              type="text"
              placeholder="Motivo del Reclamo"
              value={formData.motivoReclamo}
              onChange={handleInputChange}
            />
            <div className="flex flex-col col-span-2">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Detalle del reclamo
              </label>
              <textarea
                name="descripcion"
                placeholder="Máximo 2000 caracteres"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
                value={formData.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <SelectInput
              name="medio"
              label="Medio de Recepción"
              value={formData.medio}
              onChange={handleInputChange}
              options={[
                { value: "correo", label: "Correo" },
                { value: "carta", label: "Carta" },
              ]}
            />
            <TextInput
              label="Linea Aerea"
              name="lineaAerea"
              type="text"
              value={formData.lineaAerea}
              onChange={handleInputChange}
              disabled
            />
            <TextInput
              label="Estado de Carga"
              name="estadoCarga"
              value={
                formData.bultoMalEstado === null
                  ? ""
                  : formData.bultoMalEstado > 0
                  ? "Malo"
                  : "Bueno"
              }
              onChange={handleInputChange}
              type="text"
              disabled={true}
              placeholder="Bueno - Malo "
            />
            <TextInput
              label="Importador"
              name="nombreConsignatario"
              value={formData.nombreConsignatario}
              onChange={handleInputChange}
              type="text"
            />
            <TextInput
              label="Agente de Carga"
              name="agenteCarga"
              value={formData.agenteCarga}
              onChange={handleInputChange}
              type="text"
            />
            <TextInput
              label="Agente de Aduana"
              name="agenteAduana"
              value={formData.agenteAduana}
              onChange={handleInputChange}
              type="text"
            />

            <div className="w-full col-span-2 flex items-center justify-evenly">
              <button
                type="submit"
                className="w-1/4 mt-2 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-md text-center"
              >
                Registrar Reclamo
              </button>
              <Link
                className="w-1/4 mt-2 p-2.5 text-sm font-medium text-white bg-teal-600 rounded-md text-center"
                to="/reclamos"
              >
                Lista Reclamos
              </Link>
            </div>
          </form>
        </div>
      </div>
      {loading && <Spinner />}
      {error.error && <Mensajes>{error.mensaje}</Mensajes>}
    </div>
  );
};

export default IngresoReclamo;
