import { useState, useEffect, createContext } from "react";
import axios from "axios";

const ReclamosContext = createContext();

const ReclamosProvider = ({ children }) => {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    mensaje: "",
  });
  const [respondido, setRespondido] = useState(false);

  const handleKeyDown = async (formData, setFormData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/volantes/datos",
        {
          almacen: formData.almacen,
          numeroVolante: formData.numeroVolante,
        }
      );
      // console.log({
      //   almacen: formData.almacen,
      //   numeroVolante: formData.numeroVolante,
      // });
      // console.log(response.data[0]);
      const {
        numeroVolante,
        lineaAerea,
        estadoCarga,
        nombreConsignatario,
        agenteCarga,
        agenteAduana,
        guiaMaster,
        guiaHija,
        tipoIngreso,
        fechaVuelo,
        numeroVuelo,
      } = response.data[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        numeroVolante,
        lineaAerea,
        estadoCarga,
        nombreConsignatario,
        agenteCarga,
        agenteAduana,
        guiaMaster,
        guiaHija,
        tipoIngreso,
        fechaVuelo,
        numeroVuelo,
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
        estadoCarga: "",
        nombreConsignatario: "",
        agenteCarga: "",
        agenteAduana: "",
        guiaMaster: "",
        guiaHija: "",
        tipoIngreso: "",
        fechaVuelo: "",
        numeroVuelo: "",
      }));
      console.log(error, "llama ? ");
    } finally {
      setLoading(false);
    }
  };

  const handleForm = async (formData) => {
    // console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/reclamos",
        formData
      );
    } catch (error) {
      console.error("Error:", error);
    }
    // console.log(formData);
  };

  const listarReclamos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/listar");
      setReclamos(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    }
    setLoading(false);
  };

  const handleFechaEnvio = async (numeroVolante) => {
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaEnvio: new Date(),
      });
      // console.log(response);
      listarReclamos();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSeguridad = async (numeroVolante) => {
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRespSeguridad: new Date(),
      });
      // console.log(response);
      setRespondido(true);
      listarReclamos();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEnviarRespuestaOperaciones = async (
    numeroVolante,
    observaciones
  ) => {
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRespOperaciones: new Date(),
        observaciones,
      });
      listarReclamos();
      // console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEnviarRespuestaLegal = async (numeroVolante) => {
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRespLegal: new Date(),
      });
      listarReclamos();
      // console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRecepcionCliente = async (numeroVolante) => {
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRecepcionCliente: new Date(),
      });
      listarReclamos();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCerrarReclamo = async (numeroVolante) => {
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaCierre: new Date(),
      });
      // console.log(response);
      listarReclamos();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ReclamosContext.Provider
      value={{
        listarReclamos,
        handleSeguridad,
        handleEnviarRespuestaOperaciones,
        handleEnviarRespuestaLegal,
        handleFechaEnvio,
        handleForm,
        handleKeyDown,
        handleCerrarReclamo,
        handleRecepcionCliente,
        reclamos,
        loading,
        error,
        respondido,
      }}
    >
      {children}
    </ReclamosContext.Provider>
  );
};

export { ReclamosProvider };
export default ReclamosContext;
