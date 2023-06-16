import { useNavigate } from "react-router-dom";

const IngresoReclamo = () => {
  const navigate = useNavigate();
  return (
    <div class="max-w-full mx-auto p-4 h-full">
      <div class="flex justify-center h-full">
        <div className="max-w-[750px] w-full ">
          <h1 class="text-2xl text-center font-bold mb-4">Registro reclamo</h1>
          <form
            class="grid grid-cols-2 gap-4 p-5"
            action="your-getform-endpoint"
            method="POST"
            enctype="multipart/form-data"
          >
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Volante o Guía
              </label>
              <input
                name="name"
                type="text"
                placeholder="Número de volante o guía"
                class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Tipo de Reclamo
              </label>
              <div class="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
                <select
                  name="language"
                  required
                  class="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
                >
                  <option value="TRA">TRA</option>
                  <option value="1">RCE</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Tipo Reclamante o reclamado por
              </label>
              <div class="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
                <select
                  name="language"
                  required
                  class="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
                >
                  <option value="" disabled selected>
                    Correo
                  </option>
                  <option value="carta">Tipo Operador</option>
                  <option value="carta">Tipo 2</option>
                  <option value="carta">Tipo 3</option>
                  <option value="carta">Tipo 4</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Nombre
              </label>
              <input
                name="name"
                type="text"
                placeholder="Nombre de la persona que reclama"
                class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              />
            </div>
            <div className=" flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Fecha de Recepción
              </label>
              <input
                name="email"
                type="date"
                class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30 text-gray-500 cursor-pointer"
              />
              <div inline-datepicker data-date="02/25/2022"></div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Monto de Reclamo
              </label>
              <input
                name="name"
                type="text"
                placeholder="Monto"
                class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Ingrese su reclamo
              </label>
              <textarea
                name="message"
                id=""
                cols="30"
                rows="5"
                placeholder="Máximo 2000 caracteres"
                class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Medio de Recepción
              </label>
              <div class="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
                <select
                  name="language"
                  required
                  class="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
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
              <div class="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
                <select
                  name="language"
                  required
                  class="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
                >
                  <option value="" disabled selected>
                    Seleccione
                  </option>
                  <option value="1">Tampa Cargo S.A</option>
                  <option value="1">2</option>
                  <option value="1">T3</option>
                  <option value="1">Ta4A</option>
                  <option value="carta  ">Carta</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-left mb-2 text-gray-500 font-bold text-base">
                Carga Estado
              </label>
              <input
                name="name"
                type="text"
                placeholder="Bueno - Malo "
                class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
              />
            </div>

            <div className="w-full col-span-2">
              <button
                onClick={() => navigate("/listar-reclamos")}
                type="submit"
                class="w-1/2 mt-2 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-md text-center"
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
