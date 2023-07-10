import axios from "axios";

export const envioCorreo = async (numeroVolante, setError, setLoading) => {
  console.log(numeroVolante);
  try {
    const response = await axios.post(
      "http://192.168.10.23:8081/mail/grabar_correo",
      {
        smtp: "smtp.gmail.com",
        cuentaEnvio: "atencionalcliente@shohin.com.pe",
        clave: "Q?hBk-e5Q2$LG$qk",
        destinatarios: "desarrollo@shohin.com.pe",
        asunto: "TEST DE ENVIO DE CORREO",
        contenido: `${numeroVolante} test`,
        usuario: "jmendez",
        gmail: true,
      }
    );
    setError({ error: false, mensaje: "" });
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    setError({
      error: true,
      mensaje: "No se puedo enviar el correo",
    });
    setLoading(false);
  }
};
