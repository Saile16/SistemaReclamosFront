export const calculoHorasReclamo = (recepcion, cierre) => {
  const fechaRecepcion = new Date(recepcion);
  const fechaCierre = new Date(cierre);

  let tiempoTotal = 0;
  let fechaActual = new Date(fechaRecepcion);
  console.log(fechaActual);
  while (fechaActual < fechaCierre) {
    const diaSemana = fechaActual.getDay();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();

    // Verificar si es día laborable y está dentro del horario laboral
    if (diaSemana >= 1 && diaSemana <= 5 && hora >= 8 && hora < 17) {
      tiempoTotal++;
    }

    fechaActual.setTime(fechaActual.getTime() + 60 * 1000); // Incrementar en 1 minuto
  }

  return Math.round(tiempoTotal / 60); // Redondear al número entero más cercano
};
