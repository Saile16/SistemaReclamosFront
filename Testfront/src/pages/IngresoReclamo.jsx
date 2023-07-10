import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../components/Spinner";
import Mensajes from "../components/Mensajes";
import es from "date-fns/locale/es";
registerLocale("es", es);

const IngresoReclamo = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    mensaje: "",
  });
  const [formData, setFormData] = useState({
    almacen: "dt",
    numeroVolante: "",
    tipoReclamo: "",
    personaReclamo: "",
    fechaRecepcion: "",
    montoReclamo: "",
    motivoReclamo: "",
    descripcion: "",
    medio: "correo",
    lineaAerea: "",
    bultoMalEstado: "",
    nombreConsignatario: "",
    agenteCarga: "",
    agenteAduana: "",
    guiaMaster: "",
    guiaHija: "",
    tipoIngreso: "",
    fechaVuelo: "",
    numeroVuelo: "",
    tipoCarga: "",
    bultoRecibido: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8081/volantes/datos",
          {
            almacen: formData.almacen,
            numeroVolante: formData.numeroVolante,
          }
        );
        console.log(response.data);
        const {
          numeroVolante,
          lineaAerea,
          bultoMalEstado,
          nombreConsignatario,
          agenteCarga,
          agenteAduana,
          guiaMaster,
          guiaHija,
          tipoIngreso,
          fechaVuelo,
          numeroVuelo,
          tipoCarga,
          bultoRecibido,
        } = response.data[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          numeroVolante,
          lineaAerea,
          bultoMalEstado,
          nombreConsignatario,
          agenteCarga,
          agenteAduana,
          guiaMaster,
          guiaHija,
          tipoIngreso,
          fechaVuelo,
          numeroVuelo,
          tipoCarga,
          bultoRecibido,
        }));
        setLoading(false);
        setError({
          error: false,
          mensaje: "",
        });
      } catch (error) {
        console.error("Error:", error);
        setError({
          error: true,
          mensaje: "El numero de volante o guia no existe",
        });
        setLoading(false);
        setFormData((prevFormData) => ({
          ...prevFormData,
          medio: "correo",
          lineaAerea: "",
          bultoMalEstado: "",
          nombreConsignatario: "",
          agenteCarga: "",
          agenteAduana: "",
          guiaMaster: "",
          guiaHija: "",
          tipoIngreso: "",
          fechaVuelo: "",
          numeroVuelo: "",
          bultoRecibido: "",
        }));
        console.log(error, "llama ? ");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fechaRecepcion: date,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      estadoCarga: formData.bultoMalEstado > 0 ? "Malo" : "Bueno",
      estado: "S",
    };
    // if (Object.values(updatedFormData).includes("")) {
    //   console.log("esta vacio un eleentos");
    //   setError({
    //     error: true,
    //     mensaje: "Verifique que ingresó todos los campos ",
    //   });
    //   return;
    // }
    console.log(updatedFormData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/reclamos",
        updatedFormData
      );
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/reclamos");
    setError({
      error: false,
      mensaje: "",
    });
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
              <div className="flex flex-col col-span-1 w-2/6">
                <label className="text-left mb-2 text-gray-500 font-bold text-base">
                  Almacen
                </label>
                <div className="relative flex items-center mb-2 w-2/3 after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
                  <select
                    name="almacen"
                    required
                    className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
                    onChange={handleInputChange}
                    value={formData.almacen}
                  >
                    <option value="dt">DT</option>
                    <option value="dteer">DTEER</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col col-span-1 ">
                <label className="text-left mb-2 text-gray-500 font-bold text-base">
                  Volante
                </label>
                <input
                  name="numeroVolante"
                  type="text"
                  value={formData.numeroVolante}
                  onChange={handleInputChange}
                  onKeyDown={handleFormKeyDown}
                  placeholder="Número de volante o guía"
                  className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
                />
              </div>
              <div className="flex flex-col col-span-1 ">
                <label className="text-left mb-2 text-gray-500 font-bold text-base">
                  Guia
                </label>
                <input
                  name="numeroVolante"
                  type="text"
                  value={formData.numeroVolante}
                  onChange={handleInputChange}
                  onKeyDown={handleFormKeyDown}
                  placeholder="Número de guía"
                  className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Tipo de Reclamo
              </label>
              <div className="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
                <select
                  name="tipoReclamo"
                  required
                  className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
                  onChange={handleInputChange}
                  value={formData.tipoReclamo}
                >
                  <option value="">--------</option>
                  <option value="TRA">TRA</option>
                  <option value="RCE">RCE</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Tipo Reclamante o reclamado por
              </label>
              <div className="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
                <select
                  name="personaReclamo"
                  required
                  className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
                  onChange={handleInputChange}
                  value={formData.personaReclamo}
                >
                  <option value="----------" defaultValue>
                    --------
                  </option>
                  <option value="Agente Aduana">Agente de Aduanas</option>
                  <option value="Agente Carga">Agente de Carga</option>
                  <option value="Deposito Temporal">Deposito Temporal</option>
                  <option value="ESER">ESER</option>
                  <option value="Importador">Importador</option>
                  <option value="Linea Aerea">Linea Aerea</option>
                </select>
              </div>
            </div>

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
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Monto de Reclamo
              </label>
              <input
                name="montoReclamo"
                type="text"
                placeholder="Monto"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
                value={formData.montoReclamo}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Motivo del Reclamo
              </label>
              <input
                name="motivoReclamo"
                type="text"
                placeholder="Motivo del Reclamo"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
                value={formData.motivoReclamo}
                onChange={handleInputChange}
              />
            </div>
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

            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Medio de Recepción
              </label>
              <div className="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
                <select
                  name="medio"
                  required
                  className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
                  value={formData.medio}
                  onChange={handleInputChange}
                >
                  <option value="correo">Correo</option>
                  <option value="carta  ">Carta</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Linea Aerea
              </label>
              {/* <div className="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]"> */}
              <div className="relative flex items-center mb-2 w-full ">
                <input
                  name="lineaAerea"
                  type="text"
                  value={formData.lineaAerea}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 text-gray-800 "
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Estado de Carga
              </label>
              <input
                name="estadoCarga"
                value={
                  formData.estadoCarga === ""
                    ? ""
                    : formData.estadoCarga > 0
                    ? "Malo"
                    : "Bueno"
                }
                onChange={handleInputChange}
                type="text"
                disabled={true}
                placeholder="Bueno - Malo "
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 text-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Importador
              </label>
              <input
                name="nombreConsignatario"
                value={formData.nombreConsignatario}
                onChange={handleInputChange}
                type="text"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 text-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Agente de Carga
              </label>
              <input
                name="agenteCarga"
                value={formData.agenteCarga}
                onChange={handleInputChange}
                type="text"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 text-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Agente de Aduana
              </label>
              <input
                name="agenteAduana"
                value={formData.agenteAduana}
                onChange={handleInputChange}
                type="text"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 text-gray-800"
              />
            </div>
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
