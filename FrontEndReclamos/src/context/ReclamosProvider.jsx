import { useState, useEffect, createContext } from "react";
import axios from "axios";
const ReclamosContext = createContext();
const ReclamosProvider = ({ children }) => {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [respondido, setRespondido] = useState(false);

  const listarReclamos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/listar");
      setReclamos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    }
    setLoading(false);
  };

  const handleSeguridad = async (numeroVolante) => {
    try {
      const response = await axios.put("http://localhost:8080/api/actualizar", {
        numeroVolante,
        fechaRespSeguridad: new Date(),
      });
      console.log(response);
      setRespondido(true);
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
      console.log(response);
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
