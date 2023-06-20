import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const IngresoReclamo = () => {
  const [formData, setFormData] = useState({
    numeroVolante: "",
    tipoReclamo: "",
    personaReclamo: "",
    nombre: "",
    fechaRecepcion: "",
    montoReclamo: "",
    descripcion: "",
    medio: "",
    lineaAerea: "",
    estadoCarga: "",
    dni: "",
    ruc: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchData();
    }
  };

  const fetchData = () => {
    axios
      .post("http://localhost:8080/api/datos", {
        numeroVolante: formData.numeroVolante,
      })
      .then((response) => {
        const { numeroVolante, medio, lineaAerea, estadoCarga, dni, ruc } =
          response.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          numeroVolante,
          medio,
          lineaAerea,
          estadoCarga,
          dni,
          ruc,
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="max-w-full mx-auto p-4 h-full">
      <div className="flex justify-center h-full">
        <div className="max-w-[750px] w-full ">
          <h1 className="text-2xl text-center font-bold mb-4">
            Registro reclamo
          </h1>
          <form className="grid grid-cols-2 gap-4 p-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Volante o Guía
              </label>
              <input
                name="numeroVolante"
                type="text"
                value={formData.numeroVolante}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Número de volante o guía"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              />
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
                  <option value="OP">Tipo Operador</option>
                  <option value="Tipo2">Tipo 2</option>
                  <option value="Tipo3">Tipo 3</option>
                  <option value="Tipo4">Tipo 4</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Nombre
              </label>
              <input
                name="nombre"
                type="text"
                placeholder="Nombre de la persona que reclama"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
                onChange={handleInputChange}
                value={formData.nombre}
              />
            </div>
            <div className=" flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Fecha de Recepción
              </label>
              <input
                name="fechaRecepcion"
                type="date"
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 text-gray-500 cursor-pointer"
                value={formData.fechaRecepcion}
                onChange={handleInputChange}
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
                Ingrese su reclamo
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
                  name="language"
                  required
                  className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
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
                {/* <select
                  name="language"
                  required
                  value={formData.lineaAerea}
                  className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
                >
                  <option value="" disabled selected>
                    Seleccione
                  </option>
                  <option value="1">Tampa Cargo S.A</option>
                  <option value="1">2</option>
                  <option value="1">T3</option>
                  <option value="1">Ta4A</option>
                  <option value="carta  ">Carta</option>
                </select> */}
                <input
                  name="lineaAerea"
                  type="text"
                  value={formData.lineaAerea}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 text-gray-500 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Estado de Carga
              </label>
              <input
                name="estadoCarga"
                value={formData.estadoCarga}
                onChange={handleInputChange}
                type="text"
                placeholder="Bueno - Malo "
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Dni Responsable
              </label>
              <input
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                type="text"
                placeholder="Dato "
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                RUC
              </label>
              <input
                name="ruc"
                value={formData.ruc}
                onChange={handleInputChange}
                type="text"
                placeholder="Dato2 "
                className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              />
            </div>

            <div className="w-full col-span-2">
              <button
                // onClick={() => navigate("/listar-reclamos")}
                type="submit"
                className="w-1/2 mt-2 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-md text-center"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IngresoReclamo;
