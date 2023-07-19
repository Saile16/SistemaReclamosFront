import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { envioCorreos } from "../utils/envioCorreos";

const ReclamosContext = createContext();

const ReclamosProvider = ({ children }) => {
  const navigate = useNavigate();
  const [reclamos, setReclamos] = useState([]);

  /*Filtros de busqueda*/
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estadoReclamo, setEstadoReclamo] = useState("");
  const [tipoReclamo, setTipoReclamo] = useState("");
  //

  const [expandedRows, setExpandedRows] = useState([]);
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
    bultoMalEstado: null,
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

  //Manejar el cambio de estado al tipear
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //Limpiar campos del form
  const resetForm = () => {
    const emptyFormData = Object.assign({}, formData);
    for (let key in emptyFormData) {
      if (emptyFormData.hasOwnProperty(key)) {
        emptyFormData[key] = "";
      }
    }
    setFormData(emptyFormData);
  };

  //Datos volante al hacer enter
  const handleFormKeyDownVolante = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKENDVOLANTE_URL}/volantes`,
          {
            almacen: formData.almacen,
            numeroVolante: formData.numeroVolante,
          }
        );
        console.log(response.data[0]);
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
        resetForm();
      }
      setLoading(false);
    }
  };

  const handleFormKeyDownGuia = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoading(true);
      console.log(formData.guiaMaster);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKENDVOLANTE_URL}/guia`,
          {
            almacen: formData.almacen,
            guiaMaster: formData.guiaMaster,
          }
        );
        console.log(response.data);
        const {
          lineaAerea,
          nombreConsignatario,
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
          lineaAerea,
          nombreConsignatario,
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
        resetForm();
        console.log(error, "llama ? ");
      }
    }
  };

  //Realiza el Toggle para los detalles de cada volante
  const handleToggleRow = async (id) => {
    try {
    } catch (error) {}
    if (expandedRows.includes(id)) {
      setExpandedRows((prevExpandedRows) =>
        prevExpandedRows.filter((rowId) => rowId !== id)
      );
    } else {
      setExpandedRows((prevExpandedRows) => [...prevExpandedRows, id]);
    }
  };

  //Enviar el submit de form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      estadoCarga:
        formData.bultoMalEstado > 0
          ? "Malo"
          : formData.bultoMalEstado == null
          ? "----"
          : "Bueno",
      estado: "S",
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reclamos`,
        updatedFormData
      );
      navigate("/reclamos");
      resetForm();
      setError({
        error: false,
        mensaje: "",
      });
    } catch (error) {
      setError({
        error: true,
        mensaje: "algo salio mal",
      });
      console.log("hay error");
    }
  };

  const listarReclamos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/listar`
      );
      setReclamos(response.data);
      //   setLoading(false);
      //   console.log(response.data);
    } catch (error) {
      setError({
        error: true,
        mensaje: error.response.data.Mensaje,
      });
      setLoading(false);
    }

    setLoading(false);
  };

  const handleFechaEnvio = async (reclamo) => {
    await envioCorreos(reclamo);
    listarReclamos();
  };

  const handleSeguridad = async (numeroVolante) => {
    console.log("hey");
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/actualizar`,
        {
          numeroVolante,
          fechaRespSeguridad: new Date(),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    console.log("asasdjsda");
    listarReclamos();
  };

  const handleEnviarRespuestaOperaciones = async (
    numeroVolante,
    observaciones,
    cliente,
    fechaCitaCliente1
  ) => {
    console.log(fechaCitaCliente1);
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/actualizar`,
        {
          numeroVolante,
          fechaRespOperaciones: new Date(),
          observaciones,
          cliente,
          fechaCitaCliente1,
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos();
  };

  const handleEnviarRespuestaLegal = async (numeroVolante) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/actualizar`,
        {
          numeroVolante,
          fechaRespLegal: new Date(),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos();
  };

  const handleRecepcionCliente = async (numeroVolante) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/actualizar`,
        {
          numeroVolante,
          fechaRecepcionCliente: new Date(),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos();
  };

  const handleConfirmacion = async (
    numeroVolante,
    fechaCitaCliente2,
    asistio
  ) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/actualizar`,
        {
          numeroVolante,
          asistio,
          fechaCitaCliente2,
        }
      );
      // console.log(response);
      // listarReclamos();
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    listarReclamos();
  };

  const handleCerrarReclamo = async (numeroVolante, procede) => {
    if (procede != null) {
      try {
        console.log("eNTRO A AL TRY");
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/actualizar`,
          {
            numeroVolante,
            fechaCierre: new Date(),
            procede,
          }
        );
        setError({ error: false, mensaje: "" });
      } catch (error) {
        console.log(error);
        setError({ error: true, mensaje: error.response.data.mensaje });
      }
      return;
    }
    setError({
      error: true,
      mensaje: "Tiene que indicar si el reclamo procede o no",
    });
    listarReclamos();
  };

  return (
    <ReclamosContext.Provider
      value={{
        listarReclamos,
        handleFechaEnvio,

        handleSeguridad,
        handleEnviarRespuestaOperaciones,
        setError,
        setReclamos,
        handleEnviarRespuestaLegal,
        handleRecepcionCliente,
        handleConfirmacion,
        handleCerrarReclamo,
        setFormData,

        setLoading,
        formData,
        error,
        loading,
        reclamos,

        fechaInicio,
        setFechaInicio,
        fechaFin,
        setFechaFin,
        estadoReclamo,
        setEstadoReclamo,
        tipoReclamo,
        setTipoReclamo,

        handleInputChange,
        handleFormKeyDownVolante,
        handleFormKeyDownGuia,
        handleFormSubmit,

        handleToggleRow,
        setExpandedRows,
        expandedRows,
      }}
    >
      {children}
    </ReclamosContext.Provider>
  );
};

export { ReclamosProvider };
export default ReclamosContext;
