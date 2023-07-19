import axios from "axios";
import { format } from "date-fns";
export const envioCorreos = async (reclamo) => {
  const { almacen, guiaMaster, guiaHija, numeroVolante } = reclamo;
  try {
    if (numeroVolante == null) {
      const respuestaDatos = await axios.post(
        `${import.meta.env.VITE_BACKENDVOLANTE_URL}/guia-tarja`,
        {
          almacen,
          guiaMaster,
        }
      );
      const tarjaUbicacion = respuestaDatos.data;
      console.log(tarjaUbicacion, "esot no tiene volantes");
      const fechaEnvio = new Date();

      const datosEnviar = datosCorreo(reclamo, fechaEnvio, tarjaUbicacion);
      const respuestaCorreo = await axios.post(
        "http://localhost:8085/mail/grabar_correo",
        datosEnviar
      );
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/actualizar`,
        {
          guiaMaster,
          fechaEnvio: new Date(),
        }
      );
    } else {
      const respuestaDatos = await axios.post(
        `${import.meta.env.VITE_BACKENDVOLANTE_URL}/posiciones`,
        { almacen, guiaMaster, guiaHija }
      );
      const tarjaUbicacion = respuestaDatos.data; //reazlizar un map para las ubicaciones y fecha tarja
      console.log(tarjaUbicacion, "esot  tiene volantes");
      const respuestaFechas = await axios.post(
        `${import.meta.env.VITE_BACKENDVOLANTE_URL}/fechas`,
        {
          almacen,
          numeroVolante,
        }
      );
      const {
        fechaInicioAforo,
        fechaInicioPrevio,
        fechaTerminoAforo,
        fechaTerminoPrevio,
      } = respuestaFechas.data[0];
      const respuestaRetiros = await axios.post(
        `${import.meta.env.VITE_BACKENDVOLANTE_URL}/retiro`,
        { almacen, numeroVolante }
      );
      const { numeroSalida, fechaRetira } = respuestaRetiros.data[0];
      const fechaEnvio = new Date();
      const datosEnviar = datosCorreo(
        reclamo,
        fechaEnvio,
        tarjaUbicacion,
        fechaInicioAforo,
        fechaInicioPrevio,
        fechaTerminoAforo,
        fechaTerminoPrevio,
        numeroSalida,
        fechaRetira
      );
      const respuestaCorreo = await axios.post(
        "http://localhost:8085/mail/grabar_correo",
        datosEnviar
      );
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/actualizar`,
        {
          numeroVolante,
          fechaEnvio: new Date(),
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const datosCorreo = (
  reclamo,
  fechaEnvio,
  tarjaUbicacion,
  fechaInicioAforo = "",
  fechaInicioPrevio = "",
  fechaTerminoAforo = "",
  fechaTerminoPrevio = "",
  numeroSalida = "",
  fechaRetira = ""
) => {
  const datosCorreo = {
    smtp: "smtp.gmail.com",
    cuentaEnvio: "atencionalcliente@shohin.com.pe",
    clave: "Q?hBk-e5Q2$LG$qk",
    destinatarios: "desarrollo@shohin.com.pe",
    asunto: "TEST DE ENVIO DE CORREO",
    contenido: `Solicitante: <br> Dora del Carpio      Fecha: ${fechaEnvio.toLocaleDateString()}      Hora: ${fechaEnvio.toLocaleTimeString()} <br>
      Motivo Reclamo: ${reclamo.motivoReclamo}      Tipo de Carga: ${
      reclamo.tipoCarga == "G" ? "General" : "Faltan los otros tipos poner <br>"
    } <br>
      Awb: ${reclamo.guiaMaster}      Cantidad de bultos: ${
      reclamo.bultoRecibido
    } <br>
      Hawb: ${reclamo.guiaHija}      Bultos en mal estado: ${
      reclamo.bultoMalEstado == null ? "---" : reclamo.bultoMalEstado
    } <br>
      Hoja de Tarja ${
        !reclamo.numeroVolante ? "Inicio/Final" : ""
      } - Ubicación: ${tarjaUbicacion.map((t) =>
      t.fechaTarja != null
        ? `${format(new Date(t.fechaTarja), "dd/MM/yyyy HH:mm")} - ${
            t.posiciones
          } `
        : "No hay dato"
    )} <br>
      Tipo: ${
        reclamo.tipoIngreso == "V" ? "Carga de Importación" : "Direccionamiento"
      } <br>
      Vuelo: ${reclamo.numeroVuelo}      Fecha: ${format(
      new Date(reclamo.fechaVuelo),
      "dd/MM/yyyy"
    )} <br>
      ${
        reclamo.numeroVolante
          ? `    Fecha y Hora de Salida de carga: ${
              fechaRetira
                ? format(new Date(fechaRetira), "dd/MM/yyyy HH:mm")
                : ""
            } <br>
      Numero de Volante de salida: ${numeroSalida} <br>
      Inspecciones: ${
        fechaInicioAforo == null ? "<br>" : "Inicio ------------ Término<br>"
      }    Aforos:         ${
              fechaInicioAforo == null || fechaTerminoAforo == null
                ? "Ya cuenta con retiro <br>"
                : `${format(new Date(fechaInicioAforo), "dd/MM/yyyy")} -
          ${format(new Date(fechaTerminoAforo), "dd/MM/yyyy")} <br>`
            }
      Reconocimiento Previo: ${
        fechaInicioPrevio == null || fechaTerminoPrevio == null
          ? "Ya cuenta con retiro"
          : `${format(new Date(fechaInicioPrevio), "dd/MM/yyyy")} -
          ${format(new Date(fechaInicioPrevio), "dd/MM/yyyy")}`
      }`
          : ""
      }
      `,
    usuario: "jmendez",
    gmail: "true",
  };
  return datosCorreo;
};
